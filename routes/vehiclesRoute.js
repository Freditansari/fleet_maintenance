const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/mongodb');
const passport = require('passport');


//todo load validations here. 
const validateVehicleInput = require('../validators/Vehicle');

const Vehicle = require('../models/Vehicle');
const { response } = require('express');
const { count } = require('../models/Vehicle');

// @route   GET api/vehicle/test
// @desc    Tests vehicle route
// @access  Public

router.get('/test', (req, res) => res.json({ msg: 'Vehicle Works' }));


// @route   GET api/vehicle/
// @desc    get all vehicles
// @access  Public
router.get('/', (req, res) => {
    Vehicle.find().then(result =>{
        res.status(200).json(result);
    })

})


const countOperationalFleet = async(req, res, next) =>{
    let totalFleetCount;
    let operationalFleetCount;
    let inMaintenanceCount

    try{
        totalFleetCount = await Vehicle.countDocuments();
        inMaintenanceCount =await Vehicle.countDocuments({inMaintenance: true})
        operationalFleetCount = await Vehicle.countDocuments({isOperational : true})

        result ={
            inOperation : operationalFleetCount,
            inMaintenance: inMaintenanceCount,
            nonOperational : totalFleetCount - (operationalFleetCount + inMaintenanceCount),
        }
     

        return result
        
    }catch (error){
        return "error"
    }
}

// @route   GET api/vehicle/isoperational
// @desc    get operation vehicles counts
// @access  Public
router.get('/isoperational', (req, res) => {

    const result = countOperationalFleet()
                    .then(result=>{
                        return res.status(200).json(result);
                    })
                    .catch(error =>{ res.status(500).json(error)});

    


})



// @route   POST api/vehicle/new
// @desc    add a new vehicle 
// @access  Private
router.post('/new', (req, res) => {
    const { errors, isValid } = validateVehicleInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    hullnumber = req.body.hullnumber;

    Vehicle.findOne({HullNumber: req.body.hullnumber}).then(hullnumber =>{
        if(hullnumber){
            errors.hullnumber = 'Hull number already Exist';
            return res.status(500).json(errors);
        }else{

            const newVehicle = new Vehicle({
                name : req.body.name,
                type: req.body.type,
                model: req.body.model, 
                HullNumber : req.body.hullnumber
            });

            newVehicle
            .save()
            .then(vehicle => res.json(vehicle))
            .catch(error => res.status(500).json(error));

        }
    })

})

module.exports=router;