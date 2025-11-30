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
