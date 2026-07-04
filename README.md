# SmartStay AI

Intelligent hospitality management platform built with React, Tailwind CSS, and a Node.js/Express + MongoDB backend.

---

## Project Structure

```
SmartStay-AI/
├── backend/                        # Express REST API
│   ├── controllers/
│   │   └── reviewController.js     # Async CRUD handlers (Mongoose)
│   ├── data/
│   │   └── reviews.js              # Legacy seed data (Week 4 reference only)
│   ├── middleware/
│   │   └── errorHandler.js         # Centralized 404 / 500 handling
│   ├── models/
│   │   └── Review.js               # Mongoose schema & model (Week 5)
│   ├── routes/
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
NODE_ENV=development
```

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

## Week Notes

- **Week 4** — In-memory array, full CRUD REST API, frontend connected to live API
- **Week 5** — Replaced in-memory array with MongoDB Atlas. All API routes, response formats, and frontend UI remain unchanged. Data now persists across server restarts.
