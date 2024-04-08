import jwt from "jsonwebtoken"
export const shouldBeLoggedIn = (req, res) => {
    try {
        
        console.log('userId:: ', req.userId)

        res.status(200).json({ message: "You are Authenticated"})

    } catch (error) {
        console.log(error);
    }
}
export const shouldBeAdmin = (req, res) => {
    try {
        const token = req.cookies.token

        if (!token) return res.status(401).json({ message: "Not Authenticated!" })
        jwt.verify(token, process.env.JWT_SECRETE_KEY, async (err, payload) => {
            if (!token) return res.status(403).json({ message: "Token is not valid!" })
            if(!payload.isAdmin){
                return res.status(403).json({ message: "Not Authorized, you are not admin" })
            }
            return res.status(200).json({ message: "You are Authenticated"})
        })



    } catch (error) {
        console.log(error);
    }
}

