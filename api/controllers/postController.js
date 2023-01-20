// import post Model
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Likes from "../models/likesModel.js";
import Comments from "../models/commentsModel.js";
import Contact from "../models/contactModel.js";
import jwt from "jsonwebtoken";
import { response } from "express";

// DEFINE CONTROLLER FUNCTIONS

// listAllposts function - To list all posts
const listAllposts = (req, res) => {
  Post.find({}, (err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(post);
  });
};
const listPost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id }).populate("comments");
  if (!post) {
    res.status(404).json({ message: "Post not found" });
  } else {
    res.status(200).json(post);
  }
};

// createNewpost function - To create new post
const createNewpost = (req, res) => {
  const newpost = new Post(req.body);
  newpost.save((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(post);
  });
};

// updatepost function - To update post status by id
const updatePost = (req, res) => {
  Post.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    {
      new: true,
    },
    (err, post) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(post);
    }
  );
};

// deletepost function - To delete post by id
const deletePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  if (!post) {
    res.status(404).json({
      message: "Post not found",
    });
  } else {
    await post.deleteOne();
    res.status(200).json({
      success: true,
      message: "Post successfully deleted",
    });
  }
};

const addLike = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    // const infoOfUser = getToken(token)

    const verifyToken = jwt.verify(
      token,
      process.env.JWT_KEY,
      async (error, decodedToken) => {
        if (error) {
          res.json({
            message: "Invalid token",
          });
        } else {
          const infoOfUser = await User.findById(decodedToken.userId).select(
            -"password"
          );
          console.log("getToken", infoOfUser);
          if (infoOfUser) {
            // if condition
            let likeId = "";
            const BlogLikes = await Post.findById(req.params.id)
              .populate("likes")
              .select("likes");
            BlogLikes.likes.forEach((element) => {
              if (element.email == infoOfUser.email) {
                likeId = element._id;
              }
            });
            if (likeId == "") {
              let addedLike = {
                fullName: infoOfUser.fullName,
                email: infoOfUser.email,
              };
              let foundBlog = await Post.findById(req.params.id);
              await Likes.create(addedLike, function (err, newLike) {
                if (err) {
                  console.log(err);
                } else {
                  foundBlog.likes.push(newLike);
                  foundBlog.save();
                  res.status(200).json({
                    statusCode: 200,
                    message: "success",
                    result: "Blog successfully liked",
                  });
                }
              });
            } else {
              let foundBlog = await Post.findById(req.params.id);

              await Likes.findOneAndDelete(likeId);
              foundBlog.likes.splice(foundBlog.likes.indexOf(likeId), 1);
              foundBlog.save();
              res.json({
                message: "Like successfully removed",
              });
            }
          }
        }
      }
    );
  } else {
    res.json({
      message: "Unauthorized access",
    });
  }
};

const addComment = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const verifyToken = jwt.verify(
      token,
      process.env.JWT_KEY,
      async (error, decodedToken) => {
        if (error) {
          res.json({
            message: "Invalid token",
          });
        } else {
          const infoOfUser = await User.findById(decodedToken.userId).select(
            -"password"
          );
          console.log("getToken", infoOfUser);
          if (infoOfUser) {
            // if condition
            // find out which post you are commenting
            const id = req.params.id;
            // get the comment text and record post id
            const comment = new Comments({
              comment: req.body.comment,
              post: id,
              user: infoOfUser.id,
            });
            // save comment
            await comment.save();
            // get this particular post
            const postRelated = await Post.findById(id);
            // push the comment into the post.comments array
            postRelated.comments.push(comment);
            // save and redirect...
            await postRelated.save();
            res.status(201).json(postRelated);
          }
        }
      }
    );
  } else {
    res.json({
      message: "Unauthorized access",
    });
  }
};

const sendMessage = async (req, res) => {
  try {
    const mess = {
      username: req.body.username,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
    };
    const message = await Contact.create(mess);
    res.status(200).json({
      statusCode: 200,
      message: "Message successfully sent",
      messageId: message.id,
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      message: "Error sending message",
    });
  }
};

const listAllMessages = (req, res) => {
  Contact.find({}, (err, sms) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(sms);
  });
};

export {
  listAllposts,
  listPost,
  createNewpost,
  updatePost,
  deletePost,
  addLike,
  addComment,
  sendMessage,
  listAllMessages,
};
