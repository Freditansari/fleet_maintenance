//todo CRUD for vehicles

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../config/mongodb');
const passport = require('passport');

const Vehicle = require('../models/Vehicle');


//todo import validators

// @route   GET api/vehicle/test
// @desc    Tests vehicle route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'vehicle Works' }));


// @route   POST api/vehicle/add
// @desc    Create, add or edit vehicle
// @access  Private
router.post('/add',passport.authenticate('jwt', { session: false }), (req, res)=>{
 
    // check validations

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


module.exports = router;