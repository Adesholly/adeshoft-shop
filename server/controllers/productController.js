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

//Creating a domin product
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    user: req.user._id,
    price: 0,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    rating: 0,
    description: "sample description",
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

//Edit product and domin product
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, brand, category, countInStock, description } =
    req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    product.description = description

    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

export {
  getProducts,
  getProductByID,
  deleteProduct,
  createProduct,
  updateProduct,
}
