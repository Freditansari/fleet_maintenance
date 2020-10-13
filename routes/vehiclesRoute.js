const express = require('express');
const router = express.Router();


//todo load validations here. 
const validateVehicleInput = require('../validators/Vehicle');

const Vehicle = require('../models/Vehicle');
const { response } = require('express');
const { count, findOneAndUpdate } = require('../models/Vehicle');

// @route   GET api/vehicle/test
// @desc    Tests vehicle route
// @access  Public

router.get('/test', (req, res) => res.json({ msg: 'Vehicle Works' }));


// @route   GET api/vehicle/
// @desc    get all vehicles
// @access  Private
router.get('/', (req, res) => {
    Vehicle.find({isDeleted: false}).populate('issues').then(result =>{
        res.status(200).json(result);
    })

})

// @route   GET api/vehicle/
// @desc    get a vehicle
// @access  Private
router.get('/id', (req, res) => {
    Vehicle.findOne({_id : req.body.vehicle_id}).populate('issues').then(result =>{
        res.status(200).json(result);
    })

})

const countOperationalFleet = async(req, res, next) =>{
    let totalFleetCount;
    let operationalFleetCount;
    let inMaintenanceCount


    try{
        totalFleetCount = await Vehicle.countDocuments({isDeleted : false});
        inMaintenanceCount =await Vehicle.countDocuments({$and:[{inMaintenance: true}, {isDeleted: false}]})
        operationalFleetCount = await Vehicle.countDocuments({$and:[{isOperational: true},{inMaintenance:false} ,{isDeleted: false}]})
        nonOperationalFleetCount = await Vehicle.countDocuments({$and:[{isOperational: false},{inMaintenance:true} ,{isDeleted: false}]})
        
        // isDeletedCount = await Vehicle.countDocuments({isDeleted: true})

        result ={
            inOperation : operationalFleetCount,
            inMaintenance: inMaintenanceCount,
            nonOperational : nonOperationalFleetCount,
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

// @route   GET api/vehicle/types
// @desc    get vehicle types end point
// @access  Private
router.get('/types', (req, res) => {
    
    res.status(200).json(Vehicle.schema.path('type').enumValues)
})

// @route   POST api/vehicle/edit
// @desc    edit a single vehicle 
// @access  Private
router.post('/edit', (req, res) => {
    const { errors, isValid } = validateVehicleInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
 
    Vehicle.findByIdAndUpdate(req.body._id, req.body, {new: true})
    .then(vehicle =>{
        res.status(200).json(vehicle)
    })
    .catch(errors =>res.status(500).json(errors))

})

// @route   POST api/vehicle/delete
// @desc    delete a single vehicle 
// @access  Private
router.post('/delete', (req, res) => {
    
    Vehicle
    .findByIdAndUpdate({_id : req.body.id}, {"isDeleted": true})
    .then(vehicle =>{
        res.status(200).json(vehicle);
    })
})

module.exports=router;