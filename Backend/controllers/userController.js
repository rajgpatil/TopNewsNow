
import userModel from '../models/users.js';
import jwt from 'jsonwebtoken' //for user authontication

import bcrypt from 'bcrypt'

import validator from 'validator'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does't exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        //hashing user password
        //This generates a "salt," which is a random string added to the password before hashing.
        // The number 10 is the "salt rounds," determining how many times the hashing algorithm will run. A higher number means more secure but slower.


         //validating name email format and strong password
        if(validator.isEmpty(name.trim()) || name.length < 2){
            return res.json({success:false,message:"Please enter a valid name"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }
        if(!validator.isStrongPassword(password)){
            return res.json({success:false,message:"Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()
        const userId = user._id
        const token = createToken(userId)
        res.json({ success: true, token, userId })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

export {loginUser, registerUser}