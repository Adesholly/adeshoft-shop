import express from "express"
import {
  addOrderItems,
  getMyOrders,
  getOrderByID,
  getOrders,
  updateOrderToDeliver,
  updateOrderToPaid,
} from "../controllers/orderController.js"
import { admin, protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders)
router.route("/myorders").get(protect, getMyOrders)
router.route("/:id").get(protect, getOrderByID)
router.route("/:id/pay").put(protect, updateOrderToPaid)
router.route("/:id/deliver").put(protect, admin, updateOrderToDeliver)

export default router
