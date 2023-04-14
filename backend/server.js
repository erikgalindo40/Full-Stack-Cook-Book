const connectDB = require('./config/db')
const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require(`./middleware/errorMiddleware`)
const cors = require('cors')
const port = process.env.PORT || 5001

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(cors({origin:"*"}))

app.use('/api/recipes', require('./routes/recipeRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler) //overwritten errorHandler HAS to go under routes to work properly

app.listen(5000, ()=>console.log(`running on  port ${port}`))