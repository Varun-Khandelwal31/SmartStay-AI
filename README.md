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
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [MongoDB Atlas Setup](#mongodb-atlas-setup)
- [Google OAuth Setup](#google-oauth-setup)
- [Gemini API Setup](#gemini-api-setup)
- [Running Locally](#running-locally)
- [Production Deployment](#production-deployment)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [AI Review Analyzer](#ai-review-analyzer)
- [Future Improvements](#future-improvements)

---

## Project Overview

SmartStay AI bridges modern web development with generative AI to streamline hospitality operations. Hotel managers can track KPI metrics, perform complete CRUD operations on guest reviews, search and filter feedback, and utilize Google Gemini AI to analyze guest reviews instantly for sentiment classification, issue identification, priority scoring, and automated manager response generation.

---

## Features

- **JWT & Google OAuth 2.0 Authentication**: Secure authentication with password hashing (bcryptjs) and seamless Google sign-in.
- **Protected Routes & Persistence**: Token-based access control protecting private dashboard and AI features.
- **AI Review Analyzer**: Google Gemini 2.5 Flash integration delivering structured JSON analysis (Sentiment, Summary, Key Issues, Priority Level, and Hotel Response Draft).
- **Full Review CRUD**: Real-time review creation, reading, editing, deletion, and keyword search against MongoDB Atlas.
- **Interactive Operational Dashboard**: Live stat counters, filterable review list, star rating components, and modal edit dialogs.
- **Dark/Light Mode**: Full theme customization using Tailwind CSS and React Context.
- **Responsive Layout**: Mobile-first design tailored for smartphone, tablet, and desktop viewports.

---

## Technology Stack

- **Frontend**: React (Vite), React Router v6, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express.js, Passport.js (Google OAuth strategy), JWT, Express Validator
- **Database**: MongoDB Atlas with Mongoose ODM
- **AI Integration**: Google Gemini API (REST / Gemini 2.5 Flash model)
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
│   │   ├── ui/                 # Reusable UI primitives (Button, Modal, Toast, etc.)
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── config/
│   │   └── api.js              # Centralized API base URL config
│   ├── context/
│   │   ├── AuthContext.jsx     # Auth state management & token storage
│   │   └── ThemeContext.jsx    # Dark/Light mode state management
│   ├── pages/
│   │   ├── AIReview.jsx        # AI Review Analyzer interface
│   │   ├── AuthCallback.jsx    # Google OAuth callback handler
│   │   ├── Dashboard.jsx       # Reviews management & KPI dashboard
│   │   ├── Home.jsx            # Landing page
│   │   ├── Login.jsx           # User sign in page
│   │   ├── Register.jsx        # User registration page
│   │   └── Showcase.jsx       # Public showcase page
│   ├── App.jsx                 # Route definitions
│   └── main.jsx                # Application entrypoint
├── .env.example                # Frontend environment template
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

## Frontend Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Configure `VITE_API_URL` to point to your local or deployed Express server.

---

## Backend Setup

1. Copy `backend/.env.example` to `backend/.env`:
   ```bash
   cp backend/.env.example backend/.env
   ```
2. Fill in all required environment values (`MONGO_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, etc.).

---

## MongoDB Atlas Setup

1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a Database User under **Database Access**.
3. Allow access from anywhere (`0.0.0.0/0`) under **Network Access**.
4. Obtain the connection string under **Connect > Drivers** and set `MONGO_URI` in `backend/.env`.

---

## Google OAuth Setup

1. Navigate to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a project and configure the OAuth Consent Screen.
3. Create **OAuth 2.0 Client IDs** (Web application).
4. Add Authorized Redirect URIs:
   - Development: `http://localhost:5001/api/auth/google/callback`
   - Production: `https://your-backend.onrender.com/api/auth/google/callback`
5. Copy Client ID & Secret into `backend/.env`.

---

## Gemini API Setup

1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Generate an API Key.
3. Assign key to `GEMINI_API_KEY` in `backend/.env`.

---

## Running Locally

Run backend and frontend simultaneously in separate terminals:

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
npm run dev
```

- Frontend runs at: `http://localhost:5173`
- Backend runs at: `http://localhost:5001`

---

## Production Deployment

### Frontend (Vercel)
1. Push repository to GitHub.
2. Import repository in [Vercel](https://vercel.com).
3. Set Environment Variable:
   - `VITE_API_URL` = `https://your-backend.onrender.com`
4. Deploy. `vercel.json` will automatically manage client-side SPA routing.

### Backend (Render)
1. Create a **Web Service** in [Render](https://render.com).
2. Set Root Directory: `backend`
3. Build Command: `npm install`
4. Start Command: `node server.js`
5. Set environment variables (`PORT`, `MONGO_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `CLIENT_URL`).

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
- `GET /api/reviews/search?q=:query` — Search reviews

### AI Analysis (Protected)
- `POST /api/ai/analyze-review` — Analyze guest review text using Gemini API

---

## Authentication

Authentication is managed via JSON Web Tokens (JWT). Upon successful login or Google OAuth flow completion, the server issues a signed JWT token valid for 30 days. The client includes this token in the `Authorization: Bearer <token>` header for all protected API calls.

---

## AI Review Analyzer

The AI Review Analyzer sends review text to Google Gemini 2.5 Flash model with strict JSON schema definitions. It generates structured output containing:
1. `sentiment`: Positive / Neutral / Negative
2. `summary`: Executive summary of guest comments
3. `keyIssues`: Extracted complaint or highlight tags
4. `priority`: High / Medium / Low urgency classification
5. `hotelResponse`: Customized professional response draft

---

## Future Improvements

- Multi-property hotel filter in Dashboard.
- Automated email notification for High-priority negative reviews.
- Export review analytics reports as PDF / CSV.
- Real-time review synchronization via WebSockets.
