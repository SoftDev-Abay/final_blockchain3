const Post = require("../models/Post-model");
const AuthService = require("../services/auth-service");

class PostController {
  async createPost(req, res) {
    try {
      const {title, content, image } = req.body;
      console.log("=========================")
      console.log(title, content, image)
      console.log("=========================")

      const author = req.user.userId; 
      const newPost = new Post({
        author,
        title,
        content,
        image,
      });

      await newPost.save();
      res.status(201).json({ message: "Post created successfully!", post: newPost });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  async updatePost(req, res) {
    try {
      const { content, image } = req.body;
      const postId = req.params.id;

      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      post.content = content;
      post.image = image;

      await post.save();
      res.json({ message: "Post updated successfully!", post });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  async deletePost(req, res) {
    try {
      const postId = req.params.id;
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      await post.remove();
      res.json({ message: "Post deleted successfully!" });
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
    }
  }

  async getPostById(req, res) {
    try {
      const post = await Post.findById(req.params.id).populate("author comments.user");
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
  

  async getPostsByUser(req, res) {
    try {
      const userId = req.params.userId;
      const posts = await Post.find({ author: userId }).populate("author");
      if (posts.length === 0) {
        return res.status(404).json({ message: "No posts found for this user" });
      }
      res.json(posts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  async toggleLikePost(req, businessPosts) {
    try {
      const postId = req.params.id;
      const userId = req.user.userId;
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      const index = post.likes.indexOf(userId);
      if (index > -1) {
        post.likes.splice(index, 1);
      } else {
        post.likes.push(userId);
      }

      await post.save();
      res.json({ message: "Toggled like successfully!", likes: post.likes });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
  async getAllPosts(req, res) {
    try {
      const posts = await Post.find({}).populate("author", "name profilePicture");
      if (posts.length === 0) {
        return res.status(404).json({ message: "No posts found" });
      }
      res.json(posts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = new PostController();
