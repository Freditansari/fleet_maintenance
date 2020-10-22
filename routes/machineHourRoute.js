const express = require('express');
const router = express.Router();
const passport = require('passport');

const { response } = require('express');
const FuelLog = require('../models/FuelLog');
const Vehicle = require('../models/Vehicle');
const { create } = require('../models/Vehicle');
const machineHour = require('../models/machineHour');


router.get('/test', passport.authenticate('jwt', { session: false }), (req, res) => {

    res.status(200).json("machine hours route works")
    
})

// @route   POST api/machinehours/new
// @desc    add new machine hours log
// @access  Private
router.post('/new', passport.authenticate('jwt', { session: false }), (req, res) => {

    const addNewMachineHours = async () =>{
        try {
            const newMachineHours = machineHour({
                date : ((req.body.date)? req.body.date: Date.now()),
                machineHourUsed: req.body.machine_hour_used,
                Descriptions: req.body.descriptions,
                isBillable: req.body.is_billable,
                vehicle: req.body.vehicle_id
            })

            const newMachineHourResult = await newMachineHours.save();

            const addToVehicleResult = await Vehicle.updateOne(
                {_id: req.body.vehicle_id},
                {$push:{machineHours: newMachineHourResult._id}}
                
                )
            
            res.status(200).json(newMachineHourResult)
            
        } catch (error) {
            res.status(500).json(error)
            
        }
    }

    addNewMachineHours()
    
})

// @route   DELETE api/machinehours/remove
// @desc    remove machine hours by id
// @access  Private
router.delete('/remove', passport.authenticate('jwt', { session: false }), (req, res) => {

    const removeMachineHours = async () =>{
        try {

            const removeMachineHoursResult = 
            await machineHour
            .deleteOne({_id: req.body.machinehour_id})
            .catch(error => res.status(500).json(error));

            const removeMachineHoursInVehicle = 
            await Vehicle.updateOne(
                {_id: req.body.vehicle_id},
                {$pull : {machineHours: req.body.machinehour_id}}
                ).catch(error => res.status(500).json(error))
           
            res.status(200).json(removeMachineHoursResult)
            
        } catch (error) {
            res.status(500).json(error)
            
        }
    }

    removeMachineHours()
    
})

module.exports=router;