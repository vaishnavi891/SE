const router = require('express').Router();
const userRoutes = require('./userRoutes');
const calendarRoutes = require('./calendarRoutes');

router.use('/users', userRoutes);
router.use('/calendars', calendarRoutes);

module.exports = router;