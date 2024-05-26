const express = require("express");
const postController = require("../controllers/post-controller"); // Ensure the correct path to your post controller
const { verifyToken } = require("../middlewares/auth-middleware");
const validateObjectId = require("../middlewares/validateObjectId");

const router = express.Router();

// Route to create a new post
router.get("/all", verifyToken, postController.getAllPosts)
router.post("/create", verifyToken, postController.createPost);
router.get("/view/:id", verifyToken, validateObjectId, postController.getPostById);

module.exports = router;
