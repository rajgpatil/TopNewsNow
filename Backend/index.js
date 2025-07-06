import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './config/mongodb.js';

import userRoute from "./routes/userRoute.js"
import categoryRoute from './routes/categoryRoute.js';
import articalRoute from './routes/articalRoute.js';
import authUser from './middleware/auth.js';

dotenv.config()
const app = express()

const port = 8081;

connectDB();

app.use(express.json())

app.use(cors())

// routes
app.use('/category', categoryRoute)

app.use('/user', userRoute)

app.use('/artical', authUser ,articalRoute)

app.listen(port, () => {
    console.log("Server started on Port " + port)
})
