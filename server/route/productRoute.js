import express from "express"
import {
  getProducts,
  getProductByID,
  deleteProduct,
} from "../controllers/productController.js"

import { protect, admin } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/").get(getProducts)

router
  .route("/product/:id")
  .get(getProductByID)
  .delete(protect, admin, deleteProduct)

export default router
