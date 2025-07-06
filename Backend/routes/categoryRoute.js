import express from 'express'
import {getAll, getArticalByCategory} from '../controllers/category.js'
const categoryRoute = express.Router()

categoryRoute.get("/all",getAll)
categoryRoute.get("/specific",getArticalByCategory)

export default categoryRoute