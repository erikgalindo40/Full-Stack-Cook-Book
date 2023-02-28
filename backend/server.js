const connectDB = require('./config/db')
const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require(`./middleware/errorMiddleware`)
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/recipes', require('./routes/recipeRoutes'))

app.use(errorHandler) //overwritten errorHandler HAS to go under routes to work properly

app.listen(5000, ()=>console.log(`running on  port ${port}`))