const express = require('express');
const { auth, requireRole } = require('../middleware/auth');
const {
  createRequestHandler,
  listMyRequests,
  approveRequestHandler,
  rejectRequestHandler,
  closeRequestHandler,
} = require('../controllers/request.controller');

const router = express.Router();

router.use(auth);

router.post('/', requireRole('EMPLOYEE'), createRequestHandler);
router.get('/', listMyRequests);

router.put('/:id/approve', requireRole('MANAGER'), approveRequestHandler);
router.put('/:id/reject', requireRole('MANAGER'), rejectRequestHandler);
router.put('/:id/close', requireRole('EMPLOYEE'), closeRequestHandler);

module.exports = router;
