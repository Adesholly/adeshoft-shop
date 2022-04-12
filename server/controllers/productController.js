import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"

//Get all products to be display at the home page
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

//Get Single product to display
const getProductByID = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404).json({ message: "Product not found" })
  }
})

//Get product ID info in order to delete the product as an Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: "Product removed" })
  } else {
    res.status(404)
    throw new Error("Product not Found")
  }
})

export { getProducts, getProductByID, deleteProduct }
