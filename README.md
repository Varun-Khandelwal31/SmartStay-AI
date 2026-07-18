# SmartStay AI

Intelligent hospitality management platform built with React, Tailwind CSS, and a Node.js/Express + MongoDB backend.

---

## Project Structure

```
SmartStay-AI/
├── backend/                        # Express REST API
│   ├── controllers/
│   │   ├── aiController.js         # AI Review Analyzer handler
│   │   └── reviewController.js     # Async CRUD handlers (Mongoose)
│   ├── data/
│   │   └── reviews.js              # Legacy seed data (Week 4 reference only)
│   ├── middleware/
│   │   └── errorHandler.js         # Centralized 404 / 500 handling
│   ├── models/
│   │   └── Review.js               # Mongoose schema & model (Week 5)
│   ├── routes/
│   │   ├── ai.js                   # AI feature routes
│   │   └── reviews.js              # All 6 API routes
│   ├── .env                        # Local environment variables (git-ignored)
│   ├── .env.example                # Placeholder template
│   ├── package.json
│   └── server.js                   # Express app + MongoDB connection
├── src/                            # React frontend
│   ├── components/
│   │   ├── ui/                     # Button, Input, Modal, Toast, Loader
│   │   ├── Card.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   └── Navbar.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Dashboard.jsx           # Fetches live API data
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   └── Showcase.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## Getting Started

### 1. Frontend

```bash
# From the project root
npm install
npm run dev
```

Runs at: http://localhost:5173

---

### 2. Backend

#### Prerequisites
- Node.js v18+
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account with a cluster created

#### Setup

```bash
cd backend

# Copy the environment template
cp .env.example .env
```

Edit `backend/.env` and fill in your values:

```env
PORT=5001
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_min_32_characters
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Obtaining a Google Gemini API Key
To run the AI Review Analyzer:
1. Go to the [Google AI Studio](https://aistudio.google.com/).
2. Sign in with your Google account.
3. Click on **Get API Key** in the top navigation panel.
4. Select **Create API Key** and choose a project to associate it with (or create a new one).
5. Copy the generated API key.
6. Add it to your `backend/.env` file as `GEMINI_API_KEY=your_actual_api_key`.

#### MongoDB Atlas Steps
1. Sign in at https://cloud.mongodb.com
2. Create a free cluster (M0)
3. Go to **Database Access** → add a database user with read/write permissions
4. Go to **Network Access** → allow your IP (or `0.0.0.0/0` for dev)
5. Go to **Clusters** → **Connect** → **Connect your application** → copy the connection string
6. Replace `<username>`, `<password>`, `<cluster>`, and `<dbname>` in your `.env`

#### Run the backend

```bash
npm install
npm run dev
```

On successful start you will see:
```
MongoDB connected successfully
SmartStay AI backend running at http://localhost:5001
```

> Both servers must be running for the Dashboard to display live review data.

---

## API Endpoints

Base URL: `http://localhost:5001`

| # | Method | Endpoint                   | Description                                    | Status |
|---|--------|----------------------------|------------------------------------------------|--------|
| 1 | GET    | `/api/reviews`             | Return all reviews                             | 200    |
| 2 | GET    | `/api/reviews/:id`         | Return a single review by ID                   | 200    |
| 3 | POST   | `/api/reviews`             | Create a new review                            | 201    |
| 4 | PUT    | `/api/reviews/:id`         | Update an existing review by ID                | 200    |
| 5 | DELETE | `/api/reviews/:id`         | Delete a review by ID                          | 204    |
| 6 | GET    | `/api/reviews/search?q=`   | Search by guest name, hotel, or review text    | 200    |
| 7 | POST   | `/api/ai/analyze-review`   | Analyze review with Google Gemini API          | 200    |

### Review Shape

```json
{
  "id": "string (MongoDB ObjectId)",
  "guestName": "string",
  "hotel": "string",
  "rating": 1,
  "review": "string",
  "sentiment": "positive | neutral | negative",
  "date": "ISO 8601 string"
}
```

### Error Responses

```json
{ "success": false, "error": "Descriptive error message." }
```

| Status | Meaning          |
|--------|------------------|
| 400    | Validation error |
| 404    | Not found        |
| 500    | Server error     |

---

## Tech Stack

| Layer     | Technology                    |
|-----------|-------------------------------|
| Frontend  | React 19, Tailwind CSS 4      |
| Routing   | React Router DOM 7            |
| Build     | Vite 8                        |
| Backend   | Node.js, Express 4            |
| Database  | MongoDB Atlas + Mongoose 8    |
| CORS      | cors                          |
| Config    | dotenv                        |
| Dev       | nodemon                       |

---

## AI Review Analyzer Feature
The AI Review Analyzer is integrated to help hotel managers process guest feedback efficiently:
1. **Request Flow**: Authenticated managers input guest review text in the `/ai-review` dashboard page.
2. **API Delegation**: The React frontend sends a secure request containing the review to the Express backend. The backend loads the `GEMINI_API_KEY` environment variable and issues a request to the Google Gemini API (`gemini-1.5-flash`).
3. **Structured Response**: The backend instructs Gemini to structure the response under a strict JSON schema.
4. **Interactive Output**: The frontend parses the resulting JSON and renders:
   - **Sentiment Tag**: Positive, Neutral, or Negative (color-coded).
   - **Priority Status**: Low, Medium, or High. High priority highlights safety concerns or severe service complaints.
   - **Summary**: A concise 2-3 sentence overview.
   - **Key Issues**: Specific problems mapped out as badges.
   - **Suggested response**: A polished, ready-to-copy professional management response.

---

## Week Notes

- **Week 4** — In-memory array, full CRUD REST API, frontend connected to live API
- **Week 5** — Replaced in-memory array with MongoDB Atlas. All API routes, response formats, and frontend UI remain unchanged. Data now persists across server restarts.
- **Week 7** — Integrated Google Gemini API to analyze guest reviews and generate structured JSON responses. Added the protected frontend `/ai-review` page with responsive cards, loading feedback, and copy-to-clipboard actions.
