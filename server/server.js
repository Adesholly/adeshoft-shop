import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import colors from "colors"
import productRoute from "./route/productRoute.js"
import { notFound, customErrorHandler } from "./middleware/errorMiddleware.js"

dotenv.config()

connectDB()
const app = express()

app.use("/api/products", productRoute)

app.use(notFound)

app.use(customErrorHandler)

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server running on port ${process.env.PORT}`.yellow.underline.bold
  )
})
