const router = require('express').Router();
const { Calendar , Day } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const calendarData = await Calendar.findAll(
            {include : [Day]}
        )

        if(!calendarData){
            res.status(404).json({error: 404, message : "Cannot find any Calendars" });
            return
        }

        res.status(200).json(calendarData);

    } catch (error) {
        res.status(400).json(err);
    }
})

//Retrieve calendar with an ID
router.get('/:id', async (req, res) => {
    try {
        const calendarData = await Calendar.findOne({
            where : {
                id : req.params.id
            }
        })

        if(!calendarData){
            res.status(404).json({error: 404, message : "Cannot find a Calendar with that id" });
            return;
        }

        res.status(200).json(calendarData);

    } catch (error) {
        res.status(400).json(err);
    }
})

router.post('/', async (req, res) => {
    try {
        const calendarData = await Calendar.create(req.body);

        //If successful
        if(!calendarData){
            res.status(404).json({error: 404, message : "Could not create Calendar" });
            return;
        }

        res.status(200).json(calendarData);
    } catch (err) {
        res.status(400).json(err);
    }
});

//Update Route 
router.put('/:id', async (req, res) => {
    try {
        const calendarData = await Calendar.update({
            ...req.body
        },
        {
            where : {
                id : req.params.id
            }
        })
        //If successfuly updated
        if(!calendarData[0]){
            res.status(404).json({error: 404, message : "Could not update calendar" });
            return;
        }

        res.status(200).json(calendarData);
    } catch (error) {
        res.status(400).json(err);
    }

})


router.delete('/:id', async (req, res) => {
    try {
        const calendarData = Calendar.destroy({
            where : {
                id : req.params.id
            }
        })

        //If successfuly deleted 
        if(!calendarData){
            res.status(404).json({error: 404, message : "Could not delete calendar" });
            return;
        }

        res.status(200).json(calendarData);
    } catch (error) {
        res.status(400).json(err);
    }
})




module.exports = router;
