const router = require('express').Router();
const userRoutes = require('./userRoutes');
const questionsRoutes = require('./questionsRoute');

router.use('/users', userRoutes);
router.use('/checkin', questionsRoutes);

module.exports = router;