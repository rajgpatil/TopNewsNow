import express from 'express'
import { saveArtical,getArtical, deleteArtical} from '../controllers/articalController.js'

const articalRoute = express.Router()

articalRoute.post('/add',saveArtical)
articalRoute.get('/get',getArtical)
articalRoute.delete('/remove',deleteArtical)

export default articalRoute