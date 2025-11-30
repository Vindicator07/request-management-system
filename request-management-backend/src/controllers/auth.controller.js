const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signup = async (req, res, next) => {
  try {
    const { name, email, password, role, managerId } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || 'EMPLOYEE',
      managerId: managerId || null,
    });

    const plainUser = user.toJSON();
    delete plainUser.password;

    res.status(201).json(plainUser);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const payload = { id: user.id, role: user.role };
    const token = jwt.sign(
  { id: user.id, role: user.role, managerId: user.managerId },
  process.env.JWT_SECRET,
  { expiresIn: "2d" }
);

res.json({
  message: "Login successful",
  token,
  user: {
    id: user.id,
    name: user.name,
    role: user.role,
    managerId: user.managerId
  }
});

  } catch (err) {
    next(err);
  }
};

module.exports = { signup, login };
