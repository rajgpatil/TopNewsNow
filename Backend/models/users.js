import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    news:{
        type: [Object],
        default:[]
    }
},{minimize:false})

const userModel = mongoose.models.user || mongoose.model('user',usersSchema)

export default userModel