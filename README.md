# SmartStay AI — Intelligent Hotel Guest Review & Operations Platform

SmartStay AI is a full-stack, AI-powered hotel review analysis and management platform designed to help hospitality teams process guest feedback in real time, extract actionable sentiment and operational insights, and draft professional responses automatically using Google Gemini AI.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Authentication Flow](#authentication-flow)
- [AI Review Analyzer](#ai-review-analyzer)
- [Deployment Links](#deployment-links)
- [Screenshots Section](#screenshots-section)
- [Future Improvements](#future-improvements)
- [Contributors](#contributors)

---

## Project Overview

SmartStay AI bridges modern web development with generative AI to streamline hospitality operations. Hotel managers can track KPI metrics, perform complete CRUD operations on guest reviews, search and filter feedback, and utilize Google Gemini AI to analyze guest reviews instantly for sentiment classification, issue identification, priority scoring, and automated manager response generation.

---

## Features

- **JWT & Google OAuth 2.0 Authentication**: Secure authentication with password hashing (`bcryptjs`) and seamless Google sign-in.
- **Protected Routes & Persistence**: Token-based access control protecting private dashboard and AI features.
- **AI Review Analyzer**: Google Gemini 2.5 Flash integration delivering structured JSON analysis (Sentiment, Summary, Key Issues, Priority Level, and Hotel Response Draft).
- **Full Review CRUD**: Real-time review creation, reading, editing, deletion, and keyword search against MongoDB Atlas.
- **Interactive Operational Dashboard**: Live stat counters, filterable review list, star rating components, and modal edit dialogs.
- **Dark/Light Mode**: Full theme customization using Tailwind CSS and React Context.
- **Responsive Layout**: Mobile-first design tailored for smartphone, tablet, and desktop viewports.

---

## Technology Stack

- **Frontend**: React 19, Vite 8, Tailwind CSS v4, React Router v7
- **Backend**: Node.js, Express.js, Passport.js (Google OAuth strategy), JWT, Express Validator
- **Database**: MongoDB Atlas with Mongoose ODM
- **AI Integration**: Google Gemini API (REST / `gemini-2.5-flash` model)
- **Deployment**: Vercel (Frontend), Render (Backend)

---

## Folder Structure

```
SmartStay-AI/
├── backend/
│   ├── config/
│   │   └── passport.js         # Google OAuth Passport configuration
│   ├── controllers/
│   │   ├── aiController.js     # Gemini API review analyzer controller
│   │   ├── authController.js   # JWT authentication & register/login logic
│   │   └── reviewController.js # MongoDB CRUD controllers for guest reviews
│   ├── data/
│   │   └── seed.js             # Initial database seeding script
│   ├── middleware/
│   │   ├── auth.js             # JWT verification middleware
│   │   └── errorHandler.js     # Centralized 404 & error handlers
│   ├── models/
│   │   ├── Review.js           # Mongoose Review schema
│   │   └── User.js             # Mongoose User schema
│   ├── routes/
│   │   ├── ai.js               # AI analysis routes
│   │   ├── auth.js             # Auth & OAuth routes
│   │   └── reviews.js          # Review CRUD routes
│   ├── .env.example            # Backend environment template
│   ├── package.json
│   └── server.js               # Express app startup & MongoDB connection
├── src/
│   ├── components/
│   │   ├── ui/                 # Reusable UI primitives (Button, Input, Loader, Modal, Toast)
│   │   ├── Card.jsx            # Homestay & feature card component
│   │   ├── Footer.jsx          # Site footer
│   │   ├── Hero.jsx            # Landing page hero banner
│   │   ├── Navbar.jsx          # Top navigation bar
│   │   └── ProtectedRoute.jsx  # Auth guard component
│   ├── config/
│   │   └── api.js              # Centralized API base URL config
│   ├── context/
│   │   ├── AuthContext.jsx     # Auth state management & token storage
│   │   └── ThemeContext.jsx    # Dark/Light mode state management
│   ├── pages/
│   │   ├── AIReview.jsx        # AI Review Analyzer interface
│   │   ├── About.jsx           # Platform about page
│   │   ├── AuthCallback.jsx    # Google OAuth callback handler
│   │   ├── Dashboard.jsx       # Reviews management & KPI dashboard
│   │   ├── Home.jsx            # Landing page
│   │   ├── Login.jsx           # User sign in page
│   │   ├── Register.jsx        # User registration page
│   │   └── Showcase.jsx       # Public showcase page
│   ├── App.jsx                 # Route definitions
│   └── main.jsx                # Application entrypoint
├── BUG_FIXES.md                # Bug audit & fix report
├── CHECKLIST.md                # Deliverable compliance checklist
├── DEPLOYMENT.md               # Step-by-step deployment guide
├── TEST_CASES.md               # Complete end-to-end test case suite
├── TEST_REPORT.md              # Quality assurance & execution report
├── vercel.json                 # Vercel SPA route rewrite rules
├── package.json
└── vite.config.js              # Vite build & proxy settings
```

---

## Installation

Clone the repository and install dependencies for both frontend and backend:

```bash
git clone https://github.com/Varun-Khandelwal31/SmartStay-AI.git
cd SmartStay-AI

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

---

## Environment Variables

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:5001
```

### Backend (`backend/.env`)
```env
PORT=5001
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/smartstay
JWT_SECRET=your_jwt_secret_key_here
GEMINI_API_KEY=your_gemini_api_key_here
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
CLIENT_URL=http://localhost:5173
```

---

## API Endpoints

### Authentication
- `POST /api/auth/register` — Register new user
- `POST /api/auth/login` — Login user & obtain JWT
- `GET /api/auth/google` — Initiate Google OAuth login
- `GET /api/auth/google/callback` — Google OAuth callback

### Guest Reviews (Protected)
- `GET /api/reviews` — Get all guest reviews
- `POST /api/reviews` — Create a new guest review
- `PUT /api/reviews/:id` — Update guest review
- `DELETE /api/reviews/:id` — Delete guest review
- `GET /api/reviews/search?q=:query` — Search reviews by guest, hotel, or review text

### AI Analysis (Protected)
- `POST /api/ai/analyze-review` — Analyze guest review text using Google Gemini API

---

## Authentication Flow

1. **Email & Password Registration/Login**: Users register via `/api/auth/register`. On `/api/auth/login`, passwords are verified using `bcrypt.compare`. Upon success, a signed JWT token is issued.
2. **Google OAuth 2.0**: Users click "Continue with Google" to initiate Passport.js authentication. Upon approval from Google, the server generates a JWT token and redirects back to the frontend `/auth/callback?token=...`.
3. **Session Persistence**: The frontend `AuthContext` stores the JWT token and user object in `localStorage`. All protected requests attach `Authorization: Bearer <token>` headers.

---

## AI Review Analyzer

The AI Review Analyzer sends guest review text to Google Gemini 2.5 Flash model with strict JSON schema definitions. It generates structured output containing:
1. `sentiment`: Positive / Neutral / Negative
2. `summary`: Executive summary of guest comments
3. `keyIssues`: Extracted complaint or highlight tags (e.g., Cleanliness, Room Service)
4. `priority`: High / Medium / Low urgency classification
5. `hotelResponse`: Customized professional response draft

---

## Deployment Links

- **Frontend Production URL**: [https://smartstay-ai.vercel.app](https://smartstay-ai.vercel.app)
- **Backend API Production URL**: [https://smartstay-ai-backend.onrender.com](https://smartstay-ai-backend.onrender.com)
- **GitHub Repository**: [https://github.com/Varun-Khandelwal31/SmartStay-AI](https://github.com/Varun-Khandelwal31/SmartStay-AI)

---

## Screenshots Section

> [!NOTE]
> Detailed visual walkthroughs and screenshot previews of the SmartStay AI platform features are documented in [walkthrough.md](file:///Users/gaurav/.gemini/antigravity-ide/brain/530dd9e6-c90e-4fd1-af9a-aa953c9fb784/walkthrough.md).

1. **Landing Page**: Modern hero section highlighting signature homestays, curated collections, amenities, and quick links.
2. **Operational Dashboard**: Real-time KPI statistics, guest review listing, star rating renderer, modal forms, and live search.
3. **AI Review Analyzer**: Interactive text analysis interface with instant sentiment badges, priority indicator, issue tags, and response copy tool.
4. **Dark Mode Interface**: Modern dark theme across navigation, forms, modals, and card components.

---

## Future Improvements

- Multi-property hotel selector filter in Dashboard.
- Automated email notifications for High-priority negative reviews.
- Analytics report export in PDF / CSV formats.
- Real-time review synchronization via WebSockets.

---

## Contributors

- **Varun Khandelwal** — Full Stack Web Development Intern
- **SmartStay AI Team** — AI-Assisted Full Stack Web Development Program
