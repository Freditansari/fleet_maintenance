

const express = require('express');
const router = express.Router();
const passport = require('passport');

const fuelConsumption = require('../models/FuelConsumption');


// @route   Post api/fuelconsumptions/add
// @desc    add a vehicle breakdowns
// @access  Private
/**
 * what does it do:
 * adds a fueling log for a vehicle
 * 
 * created: Fredy   
 * tested by:
 * notes:
 * 
 * functional test ok 
 * fields required:
 * 
 *      
        
 *     
 * 
 */
router.post('/add',passport.authenticate('jwt', { session: false }), (req, res)=>{

    const newFuelCOnsumption = new fuelConsumption({
        fuelAmount : req.body.fuelAmount,
        fuelPrice : req.body.fuelPrice,
        vehicle: req.body.vehicle,
        fuelTotal : req.body.fuelAmount*fuelPrice
    });

    newFuelCOnsumption.save()
    .then(fuelConsumption=> res.json(fuelConsumption))
    .catch(error=> res.status(500).json(error));

});


// @route   Post api/fuelconsumptions/update
// @desc    remove a fuel consumptions
// @access  Private
/**
 * what does it do:
 *update a fuel consumption record
 * 
 * created: Fredy   
 * tested by:
 * notes:
 * 
 * functional test
 * fields required:
 * 
 */
router.post('/update/:fuelconsumptions_id',passport.authenticate('jwt', { session: false }), (req, res)=>{
    //todo validation

    fuelConsumption.findOneAndUpdate({_id: req.params.fuelconsumptions_id}, req.body,{new:true})
    .then((fuelConsumption)=>{
        res.status(200).json(fuelConsumption);
    })
    .catch(
        error=>res.status(500)
        .json({success:false, message: error})
        );
});


// @route   Post api/fuelconsumptions/remove
// @desc    remove a fuel consumptions
// @access  Private
/**
 * what does it do:
 * remove a fuel consumption
 * 
 * created: Fredy   
 * tested by:
 * notes:
 * 
 * functional test  
 * fields required:
 * 
 */

router.post('/remove',passport.authenticate('jwt', { session: false }), (req, res)=>{


    fuelConsumption.findByIdAndRemove({_id: req.body.fuelconsumptions_id})
    .then(res.json({message: "successfully removed: " + req.body.fuelconsumptions_id}))
    .catch(error => res.status(500).json({message:error}))
});



// @route   Post api/fuelconsumptions/getfuelconsumptions
// @desc    get  fuel consumptions
// @access  Private
/**
 * what does it do:
 * get fuel consumption from a certain date to a certain date
 * 
 * created: Fredy   
 * tested by:
 * notes:
 * 
 * functional test  
 * fields required:
 * 
 */

router.post('/getfuelconsumptions',passport.authenticate('jwt', { session: false }), (req, res)=>{

    

    fuelConsumption.find({_id})
});












 module.exports = router;