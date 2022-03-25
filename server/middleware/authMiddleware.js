import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)

      req.user = await User.findById(decodedToken.id).select("-password")
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error("Not authorized, Token failed")
    }
  }

  if (!token) {
    res.status(401)
    throw new Error("Not authorized, no token ")
  }

  next()
})

export { protect }
