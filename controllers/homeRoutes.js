const router = require('express').Router();


//Gets all post in db and displays them 
router.get('/', async (req, res) => {
    try {
        res.render('about');
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router