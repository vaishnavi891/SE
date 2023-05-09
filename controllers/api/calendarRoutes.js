const router = require('express').Router();
const { Calendar } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const calendarData = await Calendar.findAll()

        if(!calendarData){
            res.status(404).json({error: 404, message : "Cannot find any Calendars" });
            return
        }

        res.status(200).json(calendarData);

    } catch (error) {
        res.status(400).json(err);
    }
})

router.post('/', async (req, res) => {
    try {
        const calendarData = await Calendar.create(req.body);

        req.session.save(() => {
            req.session.calendar_id = calendarData.id;
            req.session.logged_in = true;

        });
        res.status(200).json(calendarData);
    } catch (err) {
        res.status(400).json(err);
    }
});


router.put('/', async (req, res) => {
    try {

    } catch (error) {
        res.status(400).json(err);
    }

})

router.delete('/', async (req, res) => {
    try {

    } catch (error) {
        res.status(400).json(err);
    }
})




module.exports = router;
