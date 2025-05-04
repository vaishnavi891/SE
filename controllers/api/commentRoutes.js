const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// POST /api/comments - create a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment_text: req.body.comment_text,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    });

    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET /api/comments/post/:postId - get comments for a post
router.get('/post/:postId', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { post_id: req.params.postId },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
      order: [['created_at', 'DESC']],
    });
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
