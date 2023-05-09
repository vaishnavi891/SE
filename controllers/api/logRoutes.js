const router = require('express').Router();
const { Log } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const logData = await Log.findAll()

        if(!logData){
            res.status(404).json({error: 404, message : "Cannot find any Logs" });
            return
        }

        res.status(200).json(logData);

    } catch (error) {
        res.status(400).json(err);
    }
})

//Retrieve log with an ID
router.get('/:id', async (req, res) => {
    try {
        const logData = await Log.findOne({
            where : {
                id : req.params.id
            }
        })

        if(!logData){
            res.status(404).json({error: 404, message : "Cannot find a Log with that id" });
            return;
        }

        res.status(200).json(logData);

    } catch (error) {
        res.status(400).json(err);
    }
})

router.post('/', async (req, res) => {
    try {
        const logData = await Log.create(req.body);

        //If successful
        if(!logData){
            res.status(404).json({error: 404, message : "Could not create Log" });
            return;
        }

        res.status(200).json(logData);
    } catch (err) {
        res.status(400).json(err);
    }
});

//Update Route 
router.put('/:id', async (req, res) => {
    try {
        const logData = await Log.update({
            ...req.body
        },
        {
            where : {
                id : req.params.id
            }
        })
        //If successfuly updated
        if(!logData[0]){
            res.status(404).json({error: 404, message : "Could not update log" });
            return;
        }

        res.status(200).json(logData);
    } catch (error) {
        res.status(400).json(err);
    }

})


router.delete('/:id', async (req, res) => {
    try {
        const logData = Log.destroy({
            where : {
                id : req.params.id
            }
        })

        //If successfuly deleted 
        if(!logData){
            res.status(404).json({error: 404, message : "Could not delete log" });
            return;
        }

        res.status(200).json(logData);
    } catch (error) {
        res.status(400).json(err);
    }
})




module.exports = router;
