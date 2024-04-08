import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js"
import jwt from "jsonwebtoken";
import { catchError, handleCatchError } from "../helper/utility.controller.js";
export const register = async (req, res) => {
    try {
        const { username, password, email } = req.body

        //* hash password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        console.log('hashed password::> ', hashedPassword)
    
        //* create new user and save in db
    
        const newUser = await prisma.user.create({
            data: {
                username, email, password: hashedPassword
            }
        })
     
        console.log('new user:: ', newUser);
    
        return res.status(200).json({ status: 200, message: 'user registered successfully', data: newUser})
    } catch (error) {
        if(error.code == 'P2002' ){
            return res.status(400).json({ message: 'User is Already exist'})
        }
        catchError('register', error, req, res)
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body
    try {
        //CHECK IS USER EXIST
        const user = await prisma.user.findUnique({
            where: { username }
        })

        if(!user){
            return res.status(401).json({ status: 401, message: "Invalid Credentials!! "})
        }

        //CHECK PASSWORD IS CORRECT
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({ status: 401, message: "Invalid Password! "})
        }

        const age = 1000 * 60 * 60 * 24 * 7 //one week age
        //CHECK TOKEN AND SEND TO USER
        const token = jwt.sign({ id: user.id, isAdmin: false}, process.env.JWT_SECRETE_KEY, { expiresIn: age} )

        const { password: userPassword, ...userInfo } = user

        return res.cookie("token", token, {
            httpOnly: true,
            secure: false  //? make sure enable in production
        }).status(200).json({
            status: 200,
            message: "Login Successful",
            data: { userInfo }
        })

    } catch (error) {
        catchError('Login', error, req, res)
    }
}
export const logout = (req, res) => {
    return res.clearCookie("token").status(200).json({ status: 200, message: "Logout Successful"})
}