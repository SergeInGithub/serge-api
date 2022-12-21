// import post Model
const Post = require("../models/postModel");

// DEFINE CONTROLLER FUNCTIONS

// listAllposts function - To list all posts
exports.listAllposts = (req, res) => {
  Post.find({}, (err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(post);
  });
};
exports.listPost = async (req, res) => {
  const post  = await Post.findOne({_id: req.params.id})
  if(!post){
    res.status(404).json({message: "Post not found"})
  } else{
    res.status(200).json(post)
  }
};

// createNewpost function - To create new post
exports.createNewpost = (req, res) => {
  let newpost = new Post(req.body);
  newpost.save((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(post);
  });
};

// updatepost function - To update post status by id
exports.updatePost = (req, res) => {
  Post.findOneAndUpdate({
    _id: req.params.id
  }, req.body, {
    new: true
  }, (err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(post);
  });
};

// deletepost function - To delete post by id
// exports.deletePost = async (req, res) => {
//   await Post.deleteOne({
//     _id: req.params.id
//   }, (err) => {
//     if (err) {
//       return res.status(404).send(err);
//     }else {
//       res.status(200).json({
//         message: "Post successfully deleted"
//       });
//     }
//   });
// };
exports.deletePost = async(req, res) => {
  const post = await Post.findOne({_id: req.params.id})
  if(!post){
    res.status(404).json({
      message: "Post not found"
    })
  } else {
    await post.deleteOne()
    res.status(200).json({
      message: "Post successfully deleted"
    })
  }
}
