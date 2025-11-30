# Request Management System (Node.js + React + PostgreSQL)

A full-stack application where **Employees** can create requests and assign them to other employees under the same manager, while **Managers** can approve or reject those requests.  
Built as a backend-focused case study demonstrating authentication, role-based authorization, and request workflow lifecycle.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT based login
- Role-based access (EMPLOYEE / MANAGER)

### 📄 Request Workflow
| Status Flow |
|------------|
| `PENDING_APPROVAL` → `APPROVED` → `CLOSED` |
| `PENDING_APPROVAL` → `REJECTED` |

### 💼 Role Capabilities
| Role | Actions |
|-------|--------|
| EMPLOYEE | Create request, assign to another employee, close approved request |
| MANAGER | Approve / Reject requests of subordinates |
| BOTH | View assigned & created requests |

### 🖥️ Dashboards
| Dashboard | Display |
|-----------|---------|
| EMPLOYEE | Create request + list of related requests |
| MANAGER | List of team requests + approve/reject controls |

---

## 🧰 Tech Stack

### Frontend
- React.js
- Axios
- React Router DOM

### Backend
- Node.js + Express.js
- Sequelize ORM
- PostgreSQL
- JWT Auth
- CORS

---

## 📂 Project Structure
root
│── backend
│ ├── controllers
│ ├── middleware
│ ├── models
│ ├── routes
│ ├── server.js
│ └── app.js
│
└── frontend
├── src
├── pages
├── Components
└── api.js