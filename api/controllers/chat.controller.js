import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import { catchError, handleCatchError } from "../helper/utility.controller.js";

export const getChats = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });

    for( let chat of chats) {
      const receiverId = chat.userIDs.find((id) => id != tokenUserId);

      const receiver = await prisma.user.findUnique({
        where: {
          id: receiverId
        },
        select: {
          id: true,
          username: true,
          avatar: true
        }
      })

      chat.receiver = receiver
    }

    return res
      .status(200)
      .json({
        status: 200,
        message: "chats fetch successfully ",
        data: { chats },
      });
  } catch (error) {
    catchError("Get Users", error, req, res);
  }
};
export const getChat = async (req, res) => {
  try {
    const chatId = req.params.id;
    const tokenUserId = req.userId;
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        seenBy: {
          push: [tokenUserId],
        },
      },
    });
    return res
      .status(200)
      .json({
        status: 200,
        message: "chat fetch successfully ",
        data: { chat },
      });
  } catch (error) {
    catchError("Get Users", error, req, res);
  }
};
export const addChat = async (req, res) => {
  const receiverId = req.body.receiverId;
  const tokenUserId = req.userId;

  console.log({
    receiverId,
    tokenUserId,
  });

  try {
    const newChat = await prisma.chat.create({
      data: {
        userIDs: [tokenUserId, receiverId],
      },
    });

    return res.status(200).json({
      status: 200,
      message: "chat created successfully",
      data: { newChat },
    });
  } catch (error) {
    catchError("Update User", error, req, res);
  }
};
export const readChat = async (req, res) => {
  const tokenUserId = req.userId;
  const chatId = req.params.id;
  try {
    const chat = await prisma.chat.update({
      where: {
        id: chatId,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      data: {
        seenBy: {
          set: [tokenUserId],
        },
      },
    });

    return res.status(200).json({
      status: 200,
      message: "chat updated successfully ",
      data: { chat },
    });
  } catch (error) {
    catchError("Delete Users", error, req, res);
  }
};
