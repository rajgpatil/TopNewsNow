
import userModel from '../models/users.js';


const saveArtical =  async (req, res) => {

    const userId = req.userId
    const { artical } = req.body

    if (!artical) {
        return res.json({ success: false, message: "Invalid or empty article data provided" })
    }

    try {

        const userData = await userModel.findById(userId)

        if (!userData) {
            return res.json({ success: false, message: "User not found" })
        }

        userData.news.push(artical)

        await userData.save()

        res.json({ success: true, message: "Article saved successfully!" })

    } catch (err) {
        console.log(err)
        return res.json({ success: false, message: err.message })
    }
}

const getArtical = async(req,res)=>{
    const userId = req.userId

    try{

        const userData = await userModel.findById(userId)

        if (!userData) {
            return res.json({ success: false, message: "User not found" })
        }

        res.json({success: true, articals: userData.news})
    }
    catch(err){
        res.json({success:false,message:err.message})
    }
}

const deleteArtical = async(req,res)=>{

    const userId = req.userId
    const {url} = req.body

    if (!url) {
        return res.json({ success: false, message: "Invalid or empty url data provided" })
    }

    try{

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            {$pull:{news:{url:url}}},
            {new: true}  // return updated user
        )
        if(!updatedUser){
            res.json({success:false,message:"Url doesn't match"})
        }
        else{
            res.json({success:true,message:"Artical is deleted Successfully"})
        }
        
    }
    catch(err){
        res.json({success:false, message:err.message})
    }
}

export {getArtical, saveArtical, deleteArtical}