import jwt from 'jsonwebtoken'

const authUser = (req, res, next) => {
    const { token } = req.headers
    try {
        if (!token) {
            return res.json({ success: false, message: "Not Authorized Login Again" })
        }
        // decode the user id from token, we pass id in token when creating the token with encryption
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        const userId = token_decode.id

        req.userId = userId
        next();
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

export default authUser