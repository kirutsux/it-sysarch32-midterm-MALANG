import express from "express";
const router = express.Router();

import {
  getAllOrders,
  createOrder,
  getOrder,
  deleteOrder,
} from "../controllers/orders.js";

import checkAuth from "../middleware/check-auth.js";

//Requests
router.get("/", checkAuth, getAllOrders);

router.post("/", checkAuth, createOrder);

router.get("/:orderId", checkAuth, getOrder);

router.delete("/:orderId", checkAuth, deleteOrder);

export default router;
