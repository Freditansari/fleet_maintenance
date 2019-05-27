//todo CRUD for vehicles

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../config/mongodb');
const passport = require('passport');

const Vehicle = require('../models/Vehicle');


//todo do validators

// @route   GET api/vehicle/test
// @desc    Tests vehicle route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'vehicle Works' }));


// @route   POST api/vehicle/get
// @desc    get vehicles
// @access  Private
//Fields:
/**
 * 
 * 
 */
router.get('/get',passport.authenticate('jwt', { session: false }), (req, res)=>{
        Vehicle.find({})
        .then(vehicles=>{
            if(!vehicles){
                res.status(404).json("no vehicles available")
            }
            res.json(vehicles)
        }).catch(errors=>res.status(500).json(errors))
});


// @route   POST api/vehicle/add
// @desc    add vehicle
// @access  Private
//Fields:
/**
 *      vehicleName,
        vehicleType,
        manufacturer,
        make,
        date,
        isDecommisioned,
        isOperational
 * 
 */
router.post('/add',passport.authenticate('jwt', { session: false }), (req, res)=>{
 
    // todo: check validations
    //can enter 2 same vehicle name. (it should be unique)


    //add a new vehicle:
    const newVehicle = new Vehicle({
        VehicleName : req.body.vehicleName,
        VehicleType: req.body.vehicleType,
        Manufacturer: req.body.manufacturer,
        Make: req.body.make,
        date: req.body.date,
        isDecommisioned: req.body.isDecommisioned,
        isOperational: req.body.isOperational
    });

    newVehicle.save().then(vehicle => res.json(vehicle)).catch(error => res.status(500).json(error) )


}); 


// @route   POST api/vehicle/breakdowns/add
// @desc    add vehicle breakdowns
// @access  Private
//Fields:
/**
    vehicle_id
    reasons

 * 
 */
router.post('/breakdowns/add',passport.authenticate('jwt', { session: false }), (req, res)=>{
    Vehicle.findOne({_id: req.body.vehicle_id})
    .then(vehicle=>{
        // res.status(200).json(vehicle);

        const newBreakDowns = {
            reasons: req.body.reasons
        }

        vehicle.isOperational=false;

        vehicle.breakDowns.push(newBreakDowns);
        // res.status(200).json(vehicle);
        vehicle.save()
        .then(vehicle=>res.json(vehicle))
        .catch(error => res.status(500).json(error));


    }) 
}); 

// @route   POST api/vehicle/breakdowns/update
// @desc    update vehicle breakdowns
// @access  Private
//Fields:
/**
    vehicle_id
    reasons

 * 
 */




module.exports = router;