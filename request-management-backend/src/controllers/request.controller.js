const { Op } = require("sequelize");
const Request = require("../models/Request");
const User = require("../models/User");

const createRequestHandler = async (req, res, next) => {
  try {
    const { title, description, assignedTo } = req.body;

    const assignee = await User.findByPk(assignedTo);
    if (!assignee) {
      return res.status(404).json({ message: "Assigned employee not found" });
    }

    if (!assignee.managerId) {
      return res.status(400).json({ message: "Assigned employee must have a manager" });
    }

    const request = await Request.create({
      title,
      description,
      createdBy: req.user.id,
      assignedTo,
    });

    res.status(201).json(request);
  } catch (err) {
    next(err);
  }
};

const listMyRequests = async (req, res, next) => {
  try {
    const { id, role } = req.user;
    let where = {};

    if (role === "EMPLOYEE") {
      where = {
        [Op.or]: [
          { createdBy: id },
          { assignedTo: id },
        ],
      };
    }

    if (role === "MANAGER") {
      const subordinates = await User.findAll({
        where: { managerId: id },
        attributes: ["id"],
      });

      const subordinateIds = subordinates.map((u) => u.id);

      if (subordinateIds.length === 0) {
  return res.json([]); // Manager has no team yet → No requests
}

where = {
  assignedTo: {
    [Op.in]: subordinateIds,
  },
};

    }

    const requests = await Request.findAll({
      where,
      include: [
        { model: User, as: "creator", attributes: ["id", "name"] },
        { model: User, as: "assignee", attributes: ["id", "name"] },
        { model: User, as: "approver", attributes: ["id", "name"] },
      ],
      order: [["updatedAt", "DESC"]],
    });

    res.json(requests);
  } catch (err) {
    next(err);
  }
};

const approveRequestHandler = async (req, res, next) => {
  try {
    console.log("Incoming approve request ID:", req.params.id);
    console.log("User trying to approve:", req.user);

    const request = await Request.findByPk(req.params.id, {
      include: [
        { model: User, as: "assignee", attributes: ["id", "name", "managerId"] },
      ],
    });

    console.log("Loaded request:", request?.toJSON());

    if (!request) {
      console.log("Request not found");
      return res.status(404).json({ message: "Request not found" });
    }

    console.log("Assignee managerId =", request.assignee?.managerId, "Approver User ID =", req.user.id);

    if (request.assignee.managerId !== req.user.id) {
      console.log("❌ Authorization failed - Not the manager");
      return res.status(403).json({ message: "Not authorized to approve" });
    }

    request.status = "APPROVED";
    request.approvedBy = req.user.id;
    await request.save();

    console.log("🎉 Successfully approved request");

    res.json(request);
  } catch (err) {
    console.log("🔥 ERROR during approve:", err);
    next(err);
  }
};


const rejectRequestHandler = async (req, res, next) => {
  try {
    const request = await Request.findByPk(req.params.id, {
      include: [
        { model: User, as: "assignee", attributes: ["id", "name", "managerId"] }
      ],
    });

    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.assignee.managerId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to reject" });
    }

    request.status = "REJECTED";
    request.approvedBy = req.user.id;
    await request.save();

    res.json(request);
  } catch (err) {
    console.log(err);
    next(err);
  }
};


const closeRequestHandler = async (req, res, next) => {
  try {
    const request = await Request.findByPk(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Only assigned employee can close
    if (request.assignedTo !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to close this request" });
    }

    // Only approved requests can be closed
    if (request.status !== "APPROVED") {
      return res.status(400).json({ message: "Request must be approved first" });
    }

    request.status = "CLOSED";
    await request.save();

    res.json({ message: "Request closed successfully", request });
  } catch (err) {
    next(err);
  }
};


module.exports = {
  createRequestHandler,
  listMyRequests,
  approveRequestHandler,
  rejectRequestHandler,
  closeRequestHandler,
};
