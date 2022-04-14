import path from "path"
import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import productRoute from "./route/productRoute.js"
import userRoute from "./route/userRoute.js"
import orderRoute from "./route/orderRoute.js"
import uploadRoute from "./route/uploadRoute.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.use("/api/products", productRoute)
app.use("/api/users", userRoute)
app.use("/api/order", orderRoute)
app.use("/api/upload", uploadRoute)

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))
app.use(notFound)

app.use(errorHandler)

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server running on port ${process.env.PORT}`.yellow.underline.bold
  )
})
