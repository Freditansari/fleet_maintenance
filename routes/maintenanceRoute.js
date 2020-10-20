const { response } = require('express');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Maintenance = require('../models/Maintenance');
const Vehicle = require('../models/Vehicle')



/**
 * TODO: 
 * load validations for requests
 * add new maintinenance (done)
 * when a vehicle update to maintenance then switch inMiantenance to true
 * add comments to maintenance => this route is in comments route
 * update maintenance
 * add costs in maintenance. => this route in cost route
 * 
 * 
 */

// @route   POST api/maintenance/new
// @desc    add new maintenances
// @access  Private
router.post('/new', passport.authenticate('jwt', { session: false }), (req, res) => {

    const addNewMaintenance =async () =>{
        try {

            const newMaintenance = new Maintenance({
                date : ((req.body.date)? req.body.date: Date.now()),
                descriptions: req.body.descriptions,
                vehicle : req.body.vehicle_id,
                dueDate : ((req.body.dueDate)? req.body.dueDate: Date.now()+ 14*24*60*60*1000),
        
            })

            const newMaintenanceResult =await newMaintenance.save()

            const updateVehicle = await Vehicle.findByIdAndUpdate(
                {_id : req.body.vehicle_id},
                {$set: {isOperational: false}},
                {$push : {maintenances:newMaintenanceResult._id}}
                
                )
            // had to do it this way because it does not work in a single call
            const setVehicleStatus = await Vehicle.update(
                {_id : req.body.vehicle_id},
                {isOperational: false, inMaintenance:true},
    
                )

            // console.log(updateVehicle);

            res.status(200).json(newMaintenanceResult)

            
            
        } catch (error) {
            res.status(500).json(error)
            
        }

   
  

    }
    addNewMaintenance()

   
})


// @route   GET api/maintenance/
// @desc    get all maintenances
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    Maintenance
        .find({isClosed: false})
        .populate("comments")
        .populate("costs")
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
})


// @route   POST api/maintenance/delete
// @desc    delete a maintenance
// @access  Private
router.post('/delete',passport.authenticate('jwt', { session: false }), (req, res) => {   
    //todo add validations 
    const removeMaintenance = async() =>{
        try {
            const maintenanceDelete = await Maintenance.deleteOne({_id: req.body.maintenance_id})

            res.status(200).json(maintenanceDelete)
            // .then(result =>{
            //     res.status(200).json(result)
            // })
            
        } catch (error) {
            res.status(500).json(error)
        }
        
    }

    removeMaintenance()

})





module.exports=router;