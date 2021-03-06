const express = require('express');
const router = express.Router();
const passport = require('passport');
const Cost = require('../models/Cost');
const Issues = require('../models/Issues');
const Maintenance = require('../models/Maintenance');


// router.post('/test', passport.authenticate('jwt', { session: false }), (req, res) => {

//     res.status(200).json("cost works")


// })


// @route   GET api/costs/
// @desc    get all costs 
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    Cost
    .find()
    .then(result => res.status(200).json(result))
    .catch(error =>res.status(500).json(error))

})



// @route   POST api/costs/issue/add
// @desc    add Costs to issue
// @access  Private
router.post('/issue/add', passport.authenticate('jwt', { session: false }), (req, res) => {

    const addCostToIssue = async() =>{
        try {

            const newIssueCost = new Cost({
                date : ((req.body.date)? req.body.date: Date.now()),
                description: req.body.description,
                cost : req.body.cost, 
                issue : req.body.issue_id
            });

            const newIssueCostResult = await newIssueCost.save()

            const addCostToIssue = await Issues
                .findByIdAndUpdate(
                    {_id: req.body.issue_id},
                    {$push :{ costs: newIssueCostResult._id }
                })

            res.status(200).json(newIssueCostResult)

        } catch (error) {
            res.status(500).json(error)
            
        }
    }

    addCostToIssue();


})



// @route   POST api/costs/maintenance/add
// @desc    add Costs to maintenance
// @access  Private
router.post('/maintenance/add', passport.authenticate('jwt', { session: false }), (req, res) => {

    const addCostToMaintenance =async () =>{
        try {
            const newMaintenanceCost = new Cost({
                date : ((req.body.date)? req.body.date: Date.now()),
                description: req.body.description,
                cost : req.body.cost, 
                maintenance : req.body.maintenance_id
            });
    
            const newMaintenanceCostResult = await newMaintenanceCost.save()
    
            const addCostToMaintenance = await Maintenance.update(
                {_id: req.body.maintenance_id},
                {$push:{costs: newMaintenanceCostResult._id }}
                )
    
            res.status(200).json(newMaintenanceCostResult);
            
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
            
        }
    

    }

    addCostToMaintenance()
  

})

module.exports=router;
