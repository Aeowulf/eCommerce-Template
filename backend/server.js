import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'

import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())
// Allows us to accept JSON data in the body

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/api/products', productRoutes)

app.use('/api/users', userRoutes)
// Puts the userRoutes function at /users path; only executes when the base of the requested path matches the specified path
app.use('/api/orders', orderRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

// app.listen(5000, console.log('Server running on port 5000'))