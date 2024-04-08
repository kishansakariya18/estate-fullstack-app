import prisma from "../lib/prisma.js"
import bcrypt from "bcrypt"
import { catchError, handleCatchError } from "../helper/utility.controller.js";

export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany()


        return res.status(200).json({ status: 200, message: "Users fetch successfully ", data: users })

    } catch (error) {
        catchError('Get Users', error, req, res)
    }
}
export const getUser = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        return res.status(200).json({ status: 200, message: "User fetch successfully ", data: user })

    } catch (error) {
        catchError('Get Users', error, req, res)
    }
}
export const updateUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const { password, avatar, ...inputs } = req.body;


    if (id !== tokenUserId) {
        return res.status(401).json({ status: 401, message: "Not Authorized" })
    }
    let updatedPassword = null
    try {

        if (password) {
            updatedPassword = await bcrypt.hash(password, 10);
        }
        const updatedUser = await prisma.user.update({
            where: { id: id }, data: {
                ...inputs,
                ...(updatedPassword && { password: updatedPassword }),
                ...(avatar && { avatar })
            }
        });
        const { password: userPassword, ...restInfo } = updatedUser
        return res.status(200).json({ status: 200, message: "User updated successfully ", data: { updatedUser: restInfo } })


    } catch (error) {
        catchError('Update User', error, req, res)
    }
}
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;

    if (id !== tokenUserId) {
        console.log('checkpoint 1');
        return res.status(401).json({ status: 401, message: "Not Authorized" })
    }
    try {
        const deletedUser =  await prisma.user.delete({
            where: { id }
        })

        return res.status(200).json({ status: 200, message: "User deleted successfully ", data: { deletedUser } })

    } catch (error) {
        catchError('Delete Users', error, req, res)
    }
}