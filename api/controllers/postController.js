// import post Model
import Post from '../models/postModel.js'

// DEFINE CONTROLLER FUNCTIONS

// listAllposts function - To list all posts
const listAllposts = (req, res) => {
  Post.find({}, (err, post) => {
    if (err) {
      res.status(500).send(err)
    }
    res.status(200).json(post)
  })
}
const listPost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id })
  if (!post) {
    res.status(404).json({ message: 'Post not found' })
  } else {
    res.status(200).json(post)
  }
}

// createNewpost function - To create new post
const createNewpost = (req, res) => {
  const newpost = new Post(req.body)
  newpost.save((err, post) => {
    if (err) {
      res.status(500).send(err)
    }
    res.status(201).json(post)
  })
}

// updatepost function - To update post status by id
const updatePost = (req, res) => {
  Post.findOneAndUpdate({
    _id: req.params.id
  }, req.body, {
    new: true
  }, (err, post) => {
    if (err) {
      res.status(500).send(err)
    }
    res.status(200).json(post)
  })
}

// deletepost function - To delete post by id
const deletePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id })
  if (!post) {
    res.status(404).json({
      message: 'Post not found'
    })
  } else {
    await post.deleteOne()
    res.status(200).json({
      message: 'Post successfully deleted'
    })
  }
}

export {
  listAllposts,
  listPost,
  createNewpost,
  updatePost,
  deletePost
}
