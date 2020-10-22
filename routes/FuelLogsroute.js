const express = require('express');
const router = express.Router();
const passport = require('passport');

const { response } = require('express');
const FuelLog = require('../models/FuelLog');
const Vehicle = require('../models/Vehicle');
const { create } = require('../models/Vehicle');


router.get('/test', passport.authenticate('jwt', { session: false }), (req, res) => {

    res.status(200).json("fuel route works")
    
})

// @route   POST api/fuels/new
// @desc    add new fuel log
// @access  Private
router.post('/new', passport.authenticate('jwt', { session: false }), (req, res) => {



        const createNewFuel = async () =>{
            try {
                const newFuelLog = FuelLog({
                    date : ((req.body.date)? req.body.date: Date.now()),
                    FuelConsumed: req.body.fuel_consumed,
                    FuelPrice : req.body.fuel_price,
                    total : req.body.fuel_consumed * req.body.fuel_price,
                    vehicle : req.body.vehicle_id
                    
                })
               const newFuelLogResult = await newFuelLog.save()
    
               const saveToVehicle = await Vehicle.updateOne(
                   {_id: req.body.vehicle_id},
                    {$push: {FuelLogs: newFuelLogResult._id}})

    
               res.status(200).json(newFuelLogResult)
                
            } catch (error) {
                res.status(500).json(error)
                
            }
  
        }

        createNewFuel()
        

    
})

// @route   DELETE api/fuels/remove
// @desc    remove fuel log by id
// @access  Private
router.delete('/remove', passport.authenticate('jwt', { session: false }), (req, res) => {



    const removeFuel = async () =>{
        try {
            
            const removeFuelFromVehicle = 
            await Vehicle.updateOne(
                {_id: req.body.vehicle_id},
                {$pull: {FuelLogs: req.body.fuellog_id}},
                {"multi":true})
            const removeFuelinCollection =
            await FuelLog.deleteOne({_id: req.body.fuellog_id})

            res.status(200).json(removeFuelinCollection)
            
        } catch (error) {
            res.status(500).json(error)
            
        }

    }

    removeFuel()
    


})

module.exports=router;