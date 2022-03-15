import express from "express"
import products from "./data/products.js"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import colors from "colors"

dotenv.config()

connectDB()
const app = express()

app.get("", (req, res) => {
  res.send("I am understanding the basics")
})

app.get("/api/products", (req, res) => {
  res.json(products)
})

app.get("/api/products/:id", (req, res) => {
  const product = products.find((item) => item._id === req.params.id)
  res.json(product)
})

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server running on port ${process.env.PORT}`.yellow.underline.bold
  )
})
