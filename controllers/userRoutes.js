const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer storage for avatar uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '..', 'public', 'images', 'avatars');
    // Ensure directory exists
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, 'avatar_' + req.session.user_id + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

// GET /profile - render logged-in user's profile page
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Post,
          include: [
            {
              model: Comment,
              include: [{ model: User, attributes: ['name'] }],
            },
          ],
        },
      ],
    });

    if (!userData) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const user = userData.get({ plain: true });

    res.render('profile', {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /profile/avatar - upload or update user avatar
router.post('/profile/avatar', withAuth, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }
    const avatarPath = '/images/avatars/' + req.file.filename;

    // Update user's avatar field in DB
    await User.update(
      { avatar: avatarPath },
      { where: { id: req.session.user_id } }
    );

    res.status(200).json({ message: 'Avatar uploaded successfully', avatar: avatarPath });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const avatarOptions = require('../utils/avatarOptions');

// GET /edit-profile - render edit profile page with avatar options
router.get('/edit-profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    if (!userData) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const user = userData.get({ plain: true });

    res.render('edit-profile', {
      user,
      avatarOptions,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /edit-profile/avatar - update user avatar from selection
router.post('/edit-profile/avatar', withAuth, async (req, res) => {
  try {
    const { avatar } = req.body;
    if (!avatar || !avatarOptions.includes(avatar)) {
      res.status(400).json({ message: 'Invalid avatar selection' });
      return;
    }

    await User.update(
      { avatar },
      { where: { id: req.session.user_id } }
    );

    res.status(200).json({ message: 'Avatar updated successfully', avatar });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
