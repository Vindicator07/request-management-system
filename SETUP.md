# Request Management System – Setup & Run Guide

This document explains how to run the project locally and how the system is structured.

---

## 1. Project Overview

This is a full-stack Request Management System built with:

- **Backend:** Node.js, Express, PostgreSQL, Sequelize, JWT
- **Frontend:** React, Axios, React Router

Core features:

- Employee/Manager signup & login
- Employees can create requests and assign them to other employees under the same manager
- Managers can approve/reject requests
- Employees can close approved requests
- Role-based access control

---

## 2. Prerequisites

Install the following:

- **Node.js** (v18+ recommended)
- **npm** (comes with Node)
- **PostgreSQL** (local or cloud instance)

---

## 3. Project Structure

```text
root/
├── request-management-backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── .env (not committed)
│
└── request-management-frontend/
    ├── src/
    │   ├── pages/
    │   ├── Components/
    │   ├── api.js
    │   └── index.js
    ├── package.json
    └── .env (optional, not committed)
Backend Setup
4.1 Create PostgreSQL Database

Create a database (locally or on a hosted provider like Render/Neon/Supabase):

Example (local):

CREATE DATABASE requestdb;

4.2 Backend Environment Variables

In request-management-backend, create a .env file:

PORT=4000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=requestdb
DB_USER=postgres
DB_PASSWORD=your_db_password

JWT_SECRET=your_jwt_secret


For cloud Postgres, adjust DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD accordingly.

4.3 Install Dependencies & Run

From the project root:

cd request-management-backend
npm install
npm run dev


The backend will start on:

http://localhost:4000


Sequelize will sync models automatically (sequelize.sync({ alter: true }) in app.js).

5. Frontend Setup
5.1 Configure API base URL

In request-management-frontend/src/api.js, the Axios instance should point to the backend API:

import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:4000",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;


For local development, you can omit .env and rely on the default http://localhost:4000.

For production, you can set:

REACT_APP_API_BASE_URL=https://your-backend-host-url

5.2 Install Dependencies & Run

From the project root:

cd request-management-frontend
npm install
npm start


The frontend will start on:

http://localhost:3000

6. Local Testing Flow

Signup a Manager

Go to /signup, choose role = MANAGER.

Login as Manager

Confirm manager dashboard loads.

Signup Employee 1 & Employee 2

Use the same manager in the “Select Manager” dropdown.

Login as Employee 1

Create a request assigned to Employee 2.

Login as Manager

Approve or Reject the request.

Login as Employee 2

If approved, close the request.

7. Production Build
Backend (for deployment)

In request-management-backend:

npm install
npm run dev   # for dev
# or
node src/server.js   # for production, after setting proper env vars

Frontend (for deployment)

In request-management-frontend:

npm install
npm run build


This generates a production build inside build/ which can be deployed on Vercel/Netlify.

8. Sample Test Users (Suggested)

When testing the app, you can manually create:

Manager:

email: manager@example.com

password: password123

Employee A:

email: employee1@example.com

password: password123

Employee B:

email: employee2@example.com

password: password123

Roles and manager assignment are handled through the signup form.