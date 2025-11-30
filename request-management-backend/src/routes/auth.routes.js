const express = require('express');
const router = express.Router();

const { auth, requireRole } = require("../middleware/auth");
const { signup, login } = require('../controllers/auth.controller');
const { getManagers, getEmployees, getMyTeam ,getTeamMembers} = require("../controllers/user.controller");

// Public
router.post('/signup', signup);
router.post('/login', login);

// Authenticated Routes
router.get("/managers", getManagers);
router.get("/my-team", auth, requireRole("EMPLOYEE"), getMyTeam);
router.get("/employees", auth, requireRole("MANAGER"), getEmployees);
router.get("/team-members", auth, requireRole("EMPLOYEE"), getTeamMembers);

module.exports = router;
