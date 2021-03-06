import express from "express"
import {
  getProducts,
  getProductByID,
  deleteProduct,
  createProduct,
  updateProduct,
  newProductReview,
} from "../controllers/productController.js"

import { protect, admin } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/").get(getProducts).post(protect, admin, createProduct)
router.route("/:id/reviews").post(protect, newProductReview)

router
  .route("/product/:id")
  .get(getProductByID)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router
