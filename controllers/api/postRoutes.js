const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts with user info
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ['id', 'name', 'avatar'] }],
      order: [['created_at', 'DESC']],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new post (authenticated users only)
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      content: req.body.content,
      user_id: req.session.user_id,
    });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a post by id (only if owned by logged-in user)
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!post) {
      res.status(404).json({ message: 'Post not found or not authorized to delete' });
      return;
    }

    await post.destroy();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post by id (only if owned by logged-in user)
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!post) {
      res.status(404).json({ message: 'Post not found or not authorized to delete' });
      return;
    }

    await post.destroy();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
