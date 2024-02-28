const errorhandler = require("../utils/error");
const Post =require("../models/postModel")
const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    next(errorhandler(403, "You are not Allowed to create a post."));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorhandler(400, "Please provide all fields"));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "-");

  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
