# SmartStay AI — Complete Production Deployment Guide

This guide provides end-to-end instructions for deploying **SmartStay AI** to production using **Vercel** for the React frontend and **Render** for the Express backend, alongside MongoDB Atlas, Google Cloud OAuth, and Google Gemini API integrations.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Step 1: Connect MongoDB Atlas](#step-1-connect-mongodb-atlas)
3. [Step 2: Connect Gemini API](#step-2-connect-gemini-api)
4. [Step 3: Connect Google OAuth](#step-3-connect-google-oauth)
5. [Step 4: Deploy Backend to Render](#step-4-deploy-backend-to-render)
6. [Step 5: Deploy Frontend to Vercel](#step-5-deploy-frontend-to-vercel)
7. [Step 6: Update OAuth & CORS URLs](#step-6-update-oauth--cors-urls)
8. [Step 7: Verify Deployment](#step-7-verify-deployment)
9. [Common Deployment Errors & Troubleshooting](#common-deployment-errors--troubleshooting)

---

## 1. Prerequisites

Before beginning deployment, ensure you have active accounts on:
- [GitHub](https://github.com)
- [Vercel](https://vercel.com)
- [Render](https://render.com)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Google Cloud Console](https://console.cloud.google.com)
- [Google AI Studio](https://aistudio.google.com)

---

## Step 1: Connect MongoDB Atlas

1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new Cluster (the free `M0` tier is suitable for production demonstration).
3. Under **Database Access**, create a Database User with read/write privileges.
4. Under **Network Access**, click **Add IP Address** and select **Allow Access From Anywhere** (`0.0.0.0/0`) so Render instances can connect.
5. Click **Database > Connect > Drivers** and copy your MongoDB connection string.
6. Format connection string:
   ```
   mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER>.mongodb.net/smartstay?retryWrites=true&w=majority
   ```

---

## Step 2: Connect Gemini API

1. Visit [Google AI Studio](https://aistudio.google.com).
2. Click **Get API key** and generate a new key.
3. Save this key string (`GEMINI_API_KEY`) safely for backend deployment.

---

## Step 3: Connect Google OAuth

1. Log in to [Google Cloud Console](https://console.cloud.google.com).
2. Create a project named `SmartStay AI`.
3. Go to **APIs & Services > Credentials**.
4. Configure the **OAuth Consent Screen** (User Type: External, specify app name and support email).
5. Go to **Credentials > Create Credentials > OAuth client ID**.
6. Select **Application type**: `Web application`.
7. Add **Authorized JavaScript Origins**:
   - `https://your-app.vercel.app`
   - `http://localhost:5173` (for local dev)
8. Add **Authorized Redirect URIs**:
   - `https://your-backend.onrender.com/api/auth/google/callback`
   - `http://localhost:5001/api/auth/google/callback` (for local dev)
9. Save the generated **Client ID** and **Client Secret**.

---

## Step 4: Deploy Backend to Render

1. Log in to [Render](https://render.com) and click **New > Web Service**.
2. Connect your GitHub repository (`SmartStay-AI`).
3. Fill out service settings:
   - **Name**: `smartstay-backend` (or your preferred name)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Expand **Advanced > Environment Variables** and add:

| Key | Value |
|---|---|
| `PORT` | `10000` (or leave default assigned by Render) |
| `MONGO_URI` | `mongodb+srv://...` |
| `JWT_SECRET` | `<random_long_secret_key>` |
| `GEMINI_API_KEY` | `<your_gemini_api_key>` |
| `GOOGLE_CLIENT_ID` | `<your_google_client_id>` |
| `GOOGLE_CLIENT_SECRET` | `<your_google_client_secret>` |
| `CLIENT_URL` | `https://your-app.vercel.app` |

5. Click **Create Web Service**. Wait for Render to build and deploy your backend.
6. Copy your deployed Render backend URL: `https://smartstay-backend.onrender.com`.

---

## Step 5: Deploy Frontend to Vercel

1. Log in to [Vercel](https://vercel.com) and click **Add New > Project**.
2. Select your `SmartStay-AI` repository.
3. Settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Expand **Environment Variables** and add:

| Key | Value |
|---|---|
| `VITE_API_URL` | `https://smartstay-backend.onrender.com` |

5. Click **Deploy**. Vercel will build and publish your static assets.

---

## Step 6: Update OAuth & CORS URLs

Once both Vercel and Render services are deployed:
1. Copy your Vercel deployment URL (e.g., `https://smartstay-ai.vercel.app`).
2. Go back to **Render environment variables** and set:
   `CLIENT_URL` = `https://smartstay-ai.vercel.app`
3. Go back to **Google Cloud Console OAuth credentials** and confirm `https://smartstay-backend.onrender.com/api/auth/google/callback` is listed under Authorized Redirect URIs.

---

## Step 7: Verify Deployment

Check all key flows on your deployed site:
- [ ] Visit `https://smartstay-ai.vercel.app` — landing page loads cleanly.
- [ ] Register a new user account with email/password.
- [ ] Sign in with Google OAuth — redirects to dashboard seamlessly.
- [ ] Perform CRUD on guest reviews: Create a review, Edit a review, Search for a review, Delete a review.
- [ ] Open **AI Review Analyzer**, enter feedback text, click **Analyze** — verifies Gemini API returns sentiment, summary, priority, and hotel response draft.

---

## Common Deployment Errors & Troubleshooting

### 1. CORS Error (`Access-Control-Allow-Origin`)
- **Symptom**: Browser console shows CORS failure on API requests.
- **Cause**: Backend `CLIENT_URL` does not match the exact frontend URL (including `https://` and without trailing slash).
- **Fix**: Check Render environment variable `CLIENT_URL` and ensure it matches `https://smartstay-ai.vercel.app`.

### 2. Vercel 404 on Page Refresh
- **Symptom**: Refreshing `/dashboard` or `/ai-review` directly gives Vercel 404 error.
- **Cause**: Missing SPA rewrite configuration.
- **Fix**: Verify `vercel.json` exists in project root with:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```

### 3. Google OAuth Redirect Mismatch (`redirect_uri_mismatch`)
- **Symptom**: Google sign in fails with `Error 400: redirect_uri_mismatch`.
- **Cause**: The callback URL sent by Passport does not match Google Cloud Console.
- **Fix**: Add `https://smartstay-backend.onrender.com/api/auth/google/callback` to Authorized Redirect URIs in Google Cloud Console.

### 4. Gemini API 500 / 502 Bad Gateway
- **Symptom**: AI analysis returns error toast or failure response.
- **Cause**: `GEMINI_API_KEY` is invalid or missing in Render environment settings.
- **Fix**: Verify `GEMINI_API_KEY` in Render environment variables.

### 5. Render Cold Start Delay
- **Symptom**: Initial request takes 30-50 seconds.
- **Cause**: Free tier Render instances spin down after 15 minutes of inactivity.
- **Fix**: This is expected behavior on free tiers. The service responds quickly once awake.
