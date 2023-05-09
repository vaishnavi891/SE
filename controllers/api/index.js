const router = require('express').Router();
const userRoutes = require('./userRoutes');
const calendarRoutes = require('./calendarRoutes');
const scoreRoutes = require('./scoreRoutes')

router.use('/users', userRoutes);
router.use('/calendars', calendarRoutes);
router.use('/scores', scoreRoutes);

module.exports = router;