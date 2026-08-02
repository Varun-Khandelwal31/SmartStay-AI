# SmartStay AI — Complete Test Suite Documentation (TEST_CASES.md)

This document contains the complete end-to-end test specification matrix for **SmartStay AI** for Week 9 Quality Assurance and Final Evaluation.

---

## Comprehensive Test Execution Matrix

| Test Case ID | Feature Area | Test Steps | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-AUTH-01** | User Registration | 1. Navigate to `/register`<br>2. Fill in Name, valid Email, Password (8+ chars)<br>3. Click "Create Account" | Account created successfully; system displays success message and redirects user to `/login`. | User account created cleanly; redirected to `/login` with success banner. | **PASS** |
| **TC-AUTH-02** | User Login | 1. Navigate to `/login`<br>2. Input registered Email & Password<br>3. Click "Sign In" | JWT token stored in `localStorage`; user session initialized and redirected to `/dashboard`. | Auth state updated; JWT stored in `localStorage`; user redirected to `/dashboard`. | **PASS** |
| **TC-AUTH-03** | User Logout | 1. Log in as an authenticated user<br>2. Click "Logout" button in Navbar or Dashboard | Session cleared (`token` & `user` purged from `localStorage`); user redirected to `/login`. | `localStorage` items removed; state reset; navigated to `/login`. | **PASS** |
| **TC-AUTH-04** | Protected Routes | 1. Clear `localStorage`<br>2. Attempt direct access to `/dashboard`, `/showcase`, `/ai-review` | `ProtectedRoute` intercepts request; user automatically redirected to `/login`. | Access blocked; instant redirect to `/login`. | **PASS** |
| **TC-DASH-01** | Dashboard Loading | 1. Log in to access `/dashboard`<br>2. Observe initial page load state | Animated full screen/container spinner loads; stats cards and reviews load smoothly from API. | Spinner displays while fetching `/api/reviews`; reviews render cleanly upon response. | **PASS** |
| **TC-CRUD-01** | Create Review | 1. On Dashboard, click "+ Add Review"<br>2. Enter Guest Name, Hotel, Rating, Review text, Sentiment<br>3. Click "Add Review" | POST request to `/api/reviews`; new review appended to list; success toast notification shown. | Review saved in MongoDB Atlas; list updated immediately with toast alert. | **PASS** |
| **TC-CRUD-02** | Read Reviews | 1. Access `/dashboard` while authenticated<br>2. Verify list display | GET `/api/reviews` returns review list sorted by date descending with star ratings and sentiment badges. | All user reviews rendered with star graphics, date, and sentiment colors. | **PASS** |
| **TC-CRUD-03** | Update Review | 1. On Dashboard, click "Edit" on a review<br>2. Modify rating and review text in Modal<br>3. Click "Update Review" | PUT request to `/api/reviews/:id`; updated review data reflected in place; modal closes. | MongoDB document updated; modal closes; UI updates with updated values and toast confirmation. | **PASS** |
| **TC-CRUD-04** | Delete Review | 1. On Dashboard, click "Delete" on a review<br>2. Confirm deletion | DELETE request to `/api/reviews/:id` returns 204 status; review removed from state and UI. | Review removed from database and UI state instantly with notification toast. | **PASS** |
| **TC-SRCH-01** | Review Search | 1. Enter query in Search input (e.g. "Manali" or guest name)<br>2. Click "Search" | GET `/api/reviews/search?q=...` returns filtered matching reviews; count indicator updates. | Query filtered correctly via backend regex search; "Clear" button restores list. | **PASS** |
| **TC-AI-01** | AI Review Analyzer | 1. Navigate to `/ai-review`<br>2. Enter guest review text<br>3. Click "Analyze" | POST to `/api/ai/analyze-review`; Gemini 2.5 Flash API returns JSON sentiment, priority, key issues, summary & response draft. | Structured AI analysis displayed with color-coded tags and copyable response draft. | **PASS** |
| **TC-EMP-01** | Empty State | 1. Trigger search query with no matching records or view empty review collection | Empty state illustration and descriptive helper message displayed cleanly without breaking UI. | "No reviews found." empty state text renders centrally without table/grid layout break. | **PASS** |
| **TC-VAL-01** | Invalid Input Validation | 1. Submit empty form in Register/Login or Review form<br>2. Submit invalid email format or empty text fields | Form submission prevented; inline red validation error messages highlight corresponding input fields. | Fields validate on client side; form submission halted with clear error messages. | **PASS** |
| **TC-ERR-01** | API Error Handling | 1. Trigger API endpoint failure or simulate bad request<br>2. Test invalid API token / 401 response | Backend returns structured error JSON; frontend catches error and displays user-friendly Toast message. | Error toast notification triggers; user redirected to `/login` if token expired (401). | **PASS** |
| **TC-RESP-01** | Mobile Responsiveness | 1. Open app on mobile device viewport (375px - 768px)<br>2. Test navigation bar, cards, modals, and forms | UI gracefully adapts; navbar links wrap or stack properly; cards switch to single column; forms stay within screen bounds. | Zero horizontal scrolling; responsive Tailwind grids scale cleanly across mobile, tablet, and desktop. | **PASS** |

---

## Test Execution Summary
- **Total Test Cases Executed**: 15
- **Passed**: 15
- **Failed**: 0
- **Overall Quality Rating**: 100% Pass
