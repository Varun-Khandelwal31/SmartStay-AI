# SmartStay AI

Intelligent hospitality management platform built with React, Tailwind CSS, and a Node.js/Express backend.

---

## Project Structure

```
SmartStay-AI/
├── backend/                  # Express REST API (Week 4)
│   ├── controllers/
│   │   └── reviewController.js
│   ├── data/
│   │   └── reviews.js        # In-memory data store
│   ├── middleware/
│   │   └── errorHandler.js   # Centralized error handling
│   ├── routes/
│   │   └── reviews.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── src/                      # React frontend
│   ├── components/
│   │   ├── ui/               # Button, Input, Modal, Toast, Loader
│   │   ├── Card.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   └── Navbar.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Dashboard.jsx     # Live API data (Week 4)
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

### Frontend

```bash
# From the project root
npm install
npm run dev
```

Runs at: http://localhost:5173

### Backend

```bash
cd backend

# Copy environment file and edit if needed
cp .env.example .env

npm install
npm run dev
```

Runs at: http://localhost:5000

> Both servers must be running for the Dashboard to display live review data.

---

## API Endpoints

Base URL: `http://localhost:5000`

| Method | Endpoint                      | Description                          | Status |
|--------|-------------------------------|--------------------------------------|--------|
| GET    | `/api/reviews`                | Return all reviews                   | 200    |
| GET    | `/api/reviews/:id`            | Return a single review by id         | 200    |
| POST   | `/api/reviews`                | Create a new review                  | 201    |
| PUT    | `/api/reviews/:id`            | Update an existing review            | 200    |
| DELETE | `/api/reviews/:id`            | Delete a review                      | 204    |
| GET    | `/api/reviews/search?q=`      | Search by guest name, hotel, or text | 200    |

### Review Shape

```json
{
  "id": "string",
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

| Status | Meaning           |
|--------|-------------------|
| 400    | Validation error  |
| 404    | Not found         |
| 500    | Server error      |

---

## Tech Stack

| Layer    | Technology                  |
|----------|-----------------------------|
| Frontend | React 19, Tailwind CSS 4    |
| Routing  | React Router DOM 7          |
| Build    | Vite 8                      |
| Backend  | Node.js, Express 4          |
| CORS     | cors                        |
| Config   | dotenv                      |
| Dev      | nodemon                     |

---

## Notes

- The backend uses an **in-memory array** — data resets on server restart. No database is used.
- Dark/Light mode is persisted in `localStorage`.
- The Dashboard fetches live data from the backend and shows the `Loader` component while loading and `Toast` on errors.
