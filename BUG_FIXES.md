# SmartStay AI — Bug Fixes & Code Optimization Log (BUG_FIXES.md)

This document tracks all bugs, issues, causes, technical solutions, and verification statuses identified and resolved across **SmartStay AI** for the Week 9 final release.

---

## Bug Fix Log

### 1. Database Seed & Startup Logging Clutter
- **Issue**: Database seed script logged excessive verbose messages during server initialization.
- **Cause**: `backend/data/seed.js` executed log statements unconditionally on import.
- **Solution**: Refactored `seed.js` log output to execute cleanly and conditionally only when called explicitly via `npm run seed`.
- **Status**: **RESOLVED**

---

### 2. Gemini API Rate Limiting & Network Timeout Handling
- **Issue**: Rapid requests to `/api/ai/analyze-review` resulted in unhandled HTTP 429 errors or hanging promises on timeout.
- **Cause**: Lack of explicit 429 response handling and request timeout signaling in `aiController.js`.
- **Solution**: Added explicit `429` status check in `aiController.js`, implemented a 15-second `AbortController` timeout, and returning structured JSON error messages.
- **Status**: **RESOLVED**

---

### 3. Route Parameter Collision on Review Search API
- **Issue**: Search requests to `/api/reviews/search?q=...` occasionally triggered Mongoose CastError 404s.
- **Cause**: Route `router.get('/:id')` was defined before `router.get('/search')`, causing Express to treat string `"search"` as a MongoDB ObjectId parameter.
- **Solution**: Reordered routes in `backend/routes/reviews.js` so `/search` is evaluated before `/:id`.
- **Status**: **RESOLVED**

---

### 4. Malformed Token & LocalStorage Hydration Crash
- **Issue**: Corrupted or manually tampered `localStorage` token/user string caused white screen crashes upon app launch.
- **Cause**: `JSON.parse(storedUser)` in `AuthContext.jsx` threw unhandled syntax errors when local storage content was invalid.
- **Solution**: Encapsulated `localStorage` hydration inside a `try/catch` block. On parsing failure, invalid keys are safely purged and state resets gracefully to unauthenticated.
- **Status**: **RESOLVED**

---

### 5. Dark Mode Input & Textarea Placeholder Contrast
- **Issue**: Input placeholders and textarea body text had poor contrast in dark theme mode.
- **Cause**: CSS utility classes for inputs in dark mode lacked explicit placeholder styles.
- **Solution**: Added `dark:text-slate-100` and `dark:placeholder:text-slate-500` classes across `Input.jsx`, `Dashboard.jsx`, and `AIReview.jsx`.
- **Status**: **RESOLVED**

---

### 6. Mobile Layout Wrapping on Small Devices (<375px)
- **Issue**: Navigation menu buttons truncated or overflowed horizontally on narrow mobile screens.
- **Cause**: Navbar container lacked proper `flex-wrap` and mobile gap scaling rules.
- **Solution**: Added `flex-wrap`, scaled padding (`px-2 py-1.5 sm:px-3 sm:py-2`), and updated utility classes in `Navbar.jsx`.
- **Status**: **RESOLVED**

---

## Code Optimization Summary
- **Console Cleanliness**: Purged unnecessary `console.log` statements in client components.
- **React Warnings**: Verified zero missing `key` props, invalid DOM properties, or unhandled promise warnings.
- **Accessibility**: Ensured clean `aria-label`, `htmlFor`, and keyboard accessibility on interactive buttons and modals.
