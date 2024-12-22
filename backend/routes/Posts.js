// backend/routes/posts.js
const express = require('express');
const Post = require('../models/BlogPost');
const { generateSummary } = require('../utils/summaryGen'); // We'll create this helper function later

const router = express.Router();

// Create a new post
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;

    // Generate summary using AI
    const summary = await generateSummary(content);

    const newPost = new Post({
      title,
      content,
      summary,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: 'Error creating post', error: err });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts', error: err });
  }
});

// Get a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching post', error: err });
  }
});

// Update a post
router.put('/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Optionally update the summary
    const summary = await generateSummary(content);
    updatedPost.summary = summary;
    await updatedPost.save();

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: 'Error updating post', error: err });
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting post', error: err });
  }
});

module.exports = router;
