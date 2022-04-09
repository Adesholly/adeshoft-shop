import express from "express"
import {
  authUser,
  editUser,
  getUserById,
  getUserProfile,
  getUsersList,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js"
import { admin, protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/").post(registerUser).get(protect, admin, getUsersList)
router.route("/login").post(authUser)
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router
  .route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, editUser)

export default router
