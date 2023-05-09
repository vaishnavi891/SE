const router = require('express').Router();
const userRoutes = require('./userRoutes');
const questionsRoutes = require('./questionsRoute');

router.use('/users', userRoutes);
router.use('/questions', questionsRoutes);

module.exports = router;