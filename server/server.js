import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import colors from "colors"
import productRoute from "./route/productRoute.js"
import userRoute from "./route/userRoute.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.use("/api/products", productRoute)
app.use("/api/users", userRoute)

app.use(notFound)

app.use(errorHandler)

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server running on port ${process.env.PORT}`.yellow.underline.bold
  )
})
