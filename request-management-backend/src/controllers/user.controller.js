const User = require("../models/User");

const getManagers = async (req, res) => {
  const managers = await User.findAll({
    where: { role: "MANAGER" },
    attributes: ["id", "name"]
  });
  res.json(managers);
};

const getEmployees = async (req, res) => {
  const employees = await User.findAll({
    where: { role: "EMPLOYEE" },
    attributes: ["id", "name"]
  });
  res.json(employees);
};

const getTeamMembers = async (req, res) => {
  try {
    const { id, role, managerId } = req.user;

    if (role !== "EMPLOYEE") return res.json([]);

    const team = await User.findAll({
      where: { managerId },
      attributes: ["id", "name"]
    });

    const filtered = team.filter((member) => member.id !== id);

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: "Error fetching team members" });
  }
};

const getMyTeam = async (req, res) => {
  try {
    const managerId = req.user.managerId;

    if (!managerId) return res.json([]);

    const employees = await User.findAll({
      where: { managerId },
      attributes: ["id", "name"]
    });

    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch team employees" });
  }
};

module.exports = { getManagers, getEmployees, getMyTeam, getTeamMembers };
