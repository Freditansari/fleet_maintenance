const { response } = require('express');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Cost = require('../models/Cost');
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
                {$push : {maintenances:newMaintenanceResult._id}}
                
                )
            // had to do it this way because it does not work in a single call
            //todo add if req.body.take_off_from_operation == true then run this else no need. 
            const setVehicleStatus = await Vehicle.update(
                {_id : req.body.vehicle_id},
                {isOperational: false, inMaintenance:true},
    
                )


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


// @route   POST api/maintenance/cost/delete
// @desc    delete a maintenance maintenance cost by id
// @access  Private
router.post('/cost/delete',passport.authenticate('jwt', { session: false }), (req, res) => {   
    //todo add validations 
    const removeMaintenanceCost = async() =>{
        try {
            const removeMaintenanceCostbyId = 
            await Maintenance.updateOne({_id: req.body.maintenance_id},
                {$pull:{costs: req.body.cost_id}},
                {"multi": true})
            
            const removeMaintenanceCostinCollections= 
            await Cost.deleteOne({_id: req.body.cost_id})

            res.status(200).json(removeMaintenanceCostbyId)
            
        } catch (error) {
            res.status(500).json(error)
        }
        
    }

    removeMaintenanceCost()

})


// @route   PUT api/maintenance/edit
// @desc    edit a maintenance from id
// @access  Private
router.put('/edit',passport.authenticate('jwt', { session: false }), (req, res) => {   
    //todo add validations 
    const editMaintenanceById = async() =>{
        try {
            const updateData ={
                descriptions: req.body.descriptions,
                isClosed: req.body.is_closed,
                vehicle : req.body.vehicle_id,
                dueDate : req.body.due_date,
            }

            const updateDataResult = await Maintenance.updateOne({_id: req.body.maintenance_id}, updateData);

            res.status(200).json(updateDataResult)

            
        } catch (error) {
            res.status(500).json(error)
        }
        
    }

    editMaintenanceById()

})






module.exports=router;