// const { DataTypes, Model } = require('sequelize');
// const sequelize = require('../config/db');
// const User = require('./User');

// class Request extends Model {}

// Request.init(
//   {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//     },
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     description: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//     status: {
//       type: DataTypes.ENUM(
//         'PENDING_APPROVAL',
//         'APPROVED',
//         'REJECTED',
//         'CLOSED'
//       ),
//       allowNull: false,
//       defaultValue: 'PENDING_APPROVAL',
//     },
//     createdBy: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       field: 'created_by',
//     },
//     assignedTo: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       field: 'assigned_to',
//     },
//     approvedBy: {
//       type: DataTypes.UUID,
//       allowNull: true,
//       field: 'approved_by',
//     },
//   },
//   {
//     sequelize,
//     modelName: 'Request',
//     tableName: 'requests',
//     underscored: true,
//   }
// );

// // basic associations
// Request.belongsTo(User, { as: 'creator', foreignKey: 'createdBy' });
// Request.belongsTo(User, { as: 'assignee', foreignKey: 'assignedTo' });
// Request.belongsTo(User, { as: 'approver', foreignKey: 'approvedBy' });

// module.exports = Request;
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

class Request extends Model {}

Request.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // status: {
    //   type: DataTypes.ENUM(
    //     "PENDING",
    //     "APPROVED",
    //     "REJECTED",
    //     "CLOSED"
    //   ),
    //   allowNull: false,
    //   defaultValue: "PENDING",
    // },
status: {
  type: DataTypes.ENUM("PENDING_APPROVAL", "APPROVED", "REJECTED", "CLOSED"),
  allowNull: false,
  defaultValue: "PENDING_APPROVAL",
},

    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "created_by",
    },

    assignedTo: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "assigned_to",
    },

    approvedBy: {
      type: DataTypes.UUID,
      allowNull: true,
      field: "approved_by",
    },
  },
  {
    sequelize,
    modelName: "Request",
    tableName: "requests",
    underscored: true,
  }
);

// ---- Associations ----
Request.belongsTo(User, { as: "creator", foreignKey: "createdBy" });
Request.belongsTo(User, { as: "assignee", foreignKey: "assignedTo" });
Request.belongsTo(User, { as: "approver", foreignKey: "approvedBy" });

module.exports = Request;
