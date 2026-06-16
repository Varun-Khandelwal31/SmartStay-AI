# SmartStay-AI

SmartStay-AI is a hospitality-focused frontend application that showcases an intelligent hotel management experience. This repository contains the Week 2 frontend skeleton — a responsive multi-page React app with reusable UI components and client-side routing.

## Features

- **Multi-page routing** — Home, About, Dashboard, and Login pages
- **Reusable components** — Navbar, Hero, Card, and Footer
- **Responsive layout** — mobile-friendly design with no horizontal scrolling
- **Tailwind CSS styling** — utility-first styling across all pages

## Tech Stack

| Technology       | Purpose                          |
| ---------------- | -------------------------------- |
| React 19         | UI library                       |
| Vite             | Build tool and dev server        |
| Tailwind CSS 4   | Styling                          |
| React Router DOM | Client-side navigation           |

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node.js)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/Varun-Khandelwal31/SmartStay-AI.git
   cd SmartStay-AI
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. Open the URL shown in the terminal (default: `http://localhost:5173`).

## Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the local development server       |
| `npm run build`   | Create a production build in `dist/`     |
| `npm run preview` | Preview the production build locally     |

## Pages

| Route        | Page      | Description                                      |
| ------------ | --------- | ------------------------------------------------ |
| `/`          | Home      | Hero section and feature cards                   |
| `/about`     | About     | Company and project overview (placeholder)       |
| `/dashboard` | Dashboard | Admin metrics view (placeholder)                 |
| `/login`     | Login     | Staff sign-in page (placeholder)                 |

## Components

All shared UI components live in `src/components/`:

| Component   | Description                                              |
| ----------- | -------------------------------------------------------- |
| `Navbar.jsx` | Top navigation bar with links to all pages              |
| `Hero.jsx`   | Full-width banner section on the Home page              |
| `Card.jsx`   | Reusable card for displaying title, description, and tag |
| `Footer.jsx` | Site footer with copyright                              |

## Project Structure

```
SmartStay-AI/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Card.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Dashboard.jsx
│   │   └── Login.jsx
│   ├── App.jsx          # Route definitions
│   ├── main.jsx         # App entry point
│   └── index.css        # Tailwind CSS imports
├── index.html
├── package.json
└── vite.config.js
```

## Responsive Design

The layout is built to work across screen sizes:

- Navigation links wrap on smaller screens
- Feature cards use a single-column layout on mobile and expand to a grid on larger screens
- `overflow-x-hidden` prevents horizontal scrolling on narrow viewports

To test mobile responsiveness, open Chrome DevTools (`F12` or `Cmd+Option+I`), toggle the device toolbar, and select a preset such as iPhone or Pixel.

## License

This project is part of an internship deliverable. All rights reserved.
