const express = require('express');
const router = express.Router();


//todo load validations here. 
// const validateVehicleInput = require('../validators/Vehicle');

// const Issues = require('../models/Issues');
const Vehicles = require('../models/Vehicle');

const { response } = require('express');
const { count, findOneAndUpdate } = require('../models/Vehicle');
const Issues = require('../models/Issues');



// @route   POST api/issues/new
// @desc    post vehicle types end point
// @access  Private
router.post('/new', (req, res) => {
    // Check Validation

   
    const createIssuesAndAddToVehicle= async() =>{
        try {
            const newIssues = new Issues({
                vehicle: req.body.vehicle_id,
                createdBy: req.body.user_id,
                dateStart : ((req.body.date_start)? req.body.date_start: Date.now()),
                descriptions : req.body.descriptions
            })

            const newIssuesResult = await newIssues.save();
            const newIssuesVehicle = await Vehicles.update({_id: req.body.vehicle_id}, {$push:{issues: newIssuesResult._id}})
            res.status(200).json(newIssuesResult);
        }catch(error){
            res.status(500).json(error)
        }
        
    }
    createIssuesAndAddToVehicle()

})

module.exports=router;