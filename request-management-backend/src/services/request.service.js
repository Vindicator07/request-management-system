const Request = require('../models/Request');
const User = require('../models/User');

async function createRequest({ title, description, createdBy, assignedTo }) {
  if (createdBy === assignedTo) {
    throw new Error('You cannot assign a request to yourself');
  }

  const assignee = await User.findByPk(assignedTo);
  if (!assignee) {
    throw new Error('Assigned employee not found');
  }

  if (!assignee.managerId) {
    throw new Error('Assigned employee does not have a manager');
  }

  return Request.create({
    title,
    description,
    createdBy,
    assignedTo,
  });
}

async function approveRequest({ requestId, managerId }) {
  const request = await Request.findByPk(requestId, {
    include: [{ model: User, as: 'assignee' }],
  });

  if (!request) {
    const err = new Error('Request not found');
    err.status = 404;
    throw err;
  }

  if (request.status !== 'PENDING_APPROVAL') {
    const err = new Error('Only pending requests can be approved');
    err.status = 400;
    throw err;
  }

  if (!request.assignee || request.assignee.managerId !== managerId) {
    const err = new Error('You are not manager of the assigned employee');
    err.status = 403;
    throw err;
  }

  request.status = 'APPROVED';
  request.approvedBy = managerId;
  await request.save();

  return request;
}

async function rejectRequest({ requestId, managerId }) {
  const request = await Request.findByPk(requestId, {
    include: [{ model: User, as: 'assignee' }],
  });

  if (!request) {
    const err = new Error('Request not found');
    err.status = 404;
    throw err;
  }

  if (request.status !== 'PENDING_APPROVAL') {
    const err = new Error('Only pending requests can be rejected');
    err.status = 400;
    throw err;
  }

  if (!request.assignee || request.assignee.managerId !== managerId) {
    const err = new Error('You are not manager of the assigned employee');
    err.status = 403;
    throw err;
  }

  request.status = 'REJECTED';
  request.approvedBy = managerId;
  await request.save();

  return request;
}

async function closeRequest({ requestId, employeeId }) {
  const request = await Request.findByPk(requestId);

  if (!request) {
    const err = new Error('Request not found');
    err.status = 404;
    throw err;
  }

  if (request.assignedTo !== employeeId) {
    const err = new Error('Only assigned employee can close this request');
    err.status = 403;
    throw err;
  }

  if (request.status !== 'APPROVED') {
    const err = new Error('Request must be approved before closing');
    err.status = 400;
    throw err;
  }

  request.status = 'CLOSED';
  await request.save();

  return request;
}

module.exports = {
  createRequest,
  approveRequest,
  rejectRequest,
  closeRequest,
};
