import { catchError } from "../helper/utility.controller.js";
import prisma from "../lib/prisma.js";

export const getPosts = async (req, res) => {
  try {
    console.log('query:: ', req.query);
      const query = req.query
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || 0,
          lte: parseInt(query.maxPrice) || 10000
        }
      }
    });

    console.log('posts:: ', posts);

    return res
      .status(200)
      .json({
        status: 200,
        message: "Posts fetch successfully",
        data: { posts },
      });
  } catch (error) {
    catchError("Get Posts", error, req, res);
  }
};

export const getPost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    return res
      .status(200)
      .json({
        status: 200,
        message: "Post fetch successfully",
        data: { post },
      });
  } catch (error) {
    catchError("Get Post", error, req, res);
  }
};

export const addPost = async (req, res) => {
  const tokenUserId = req.userId;
  const body = req.body;

  try {
    const createdPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });



    return res
      .status(200)
      .json({
        status: 200,
        message: "Post added successfully",
        data: { createdPost },
      });
  } catch (error) {
    catchError("Add Post", error, req, res);
  }
};
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const tokenUserId = req.userId;
  const body = req.body;
  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
    });

    return res
      .status(200)
      .json({
        status: 200,
        message: "Post updated successfully",
        data: { updatedPost },
      });
  } catch (error) {
    catchError("Update Post", error, req, res);
  }
};
export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const tokenUserId = req.userId;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    console.log("post:: > ", post);
    if (post.userId !== tokenUserId) {
      return res
        .status(403)
        .json({ status: 403, message: "Not Authorized for delete post" });
    }

    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return res
      .status(200)
      .json({
        status: 200,
        message: "Post deleted successfully",
        data: { deletedPost },
      });
  } catch (error) {
    catchError("Delete Post", error, req, res);
  }
};
