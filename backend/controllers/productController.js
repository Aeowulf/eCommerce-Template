import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  // Not entirely sure what this does. I think it makes getProducts wait for Product.find to return the object it's looking for? Then assigns it to "products"?
  // More research into asynchronous JavaScript needed.
      
  res.json(products)
  // Responds with JSON-ified products
})

// @desc    Fetch single products
// @route   GET /api/products/:id
// @access  Public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if(product){
      res.json(product)
  } else {
      res.status(404)

      throw new Error('Product not found')
  }
})

export {
  getProducts,
  getProductById,
}