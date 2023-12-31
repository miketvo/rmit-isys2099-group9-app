/* eslint-disable no-unused-vars */
const express = require("express");
const inboundOrderRouter = express.Router();

const {
  createInboundOrder,
  getAllInboundOrder,
  getInboundOrderByID,
  updateInboundOrder,
  deleteInboundOrder,
  fulfillInboundOrder,
} = require("../controllers/inboundOrderController");

const { authenticate } = require("../middleware/authenticate");
const {
  checkBuyer,
  checkSeller,
  checkAdmin,
} = require("../middleware/checkRoles");

inboundOrderRouter.post(
  "/create",
  authenticate,
  checkSeller,
  createInboundOrder,
);
inboundOrderRouter.get("/", authenticate, checkSeller, getAllInboundOrder);
inboundOrderRouter.get("/:id", authenticate, checkSeller, getInboundOrderByID);
inboundOrderRouter.put(
  "/update/:id",
  authenticate,
  checkSeller,
  updateInboundOrder,
);
inboundOrderRouter.delete(
  "/delete/:id",
  authenticate,
  checkSeller,
  deleteInboundOrder,
);
inboundOrderRouter.put(
  "/fulfill/:id",
  authenticate,
  checkSeller,
  fulfillInboundOrder,
);

module.exports = inboundOrderRouter;
