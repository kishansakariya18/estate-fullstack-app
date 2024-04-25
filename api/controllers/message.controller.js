import { catchError } from "../helper/utility.controller.js"
import prisma from "../lib/prisma.js";

export const addMessage = async (req, res) => {
    const tokenUserId = req.userId;
    const chatId = req.params.chatId;
    const text = req.body.text;

    console.log('token user id: ', tokenUserId)
    try {
        const chat = await prisma.chat.findUnique({
            where: {
                id: chatId,
                userIDs: {
                    hasSome: [tokenUserId]
                }
            },
        })

        if(!chat){
            return res.status(404).json({ status: 404, message: "chat not found", data: null})
        }

        const message = await prisma.message.create({ 
            data: {
                text,
                chatId,
                userId: tokenUserId
            }
        })

        await prisma.chat.update({
            where: {
                id: chatId
            },
            data: {
                seenBy: [tokenUserId],
                lastMessage: text
            }
        })


        return res.status(200).json({ status: 200, message: 'message added successfully', data: { message }})

    } catch (error) {
        catchError('add message',  error, req, res)
    }
}