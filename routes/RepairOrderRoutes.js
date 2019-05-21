

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../config/mongodb');
const passport = require('passport');
// @route   POST api/vehicle/repairorders/add
// @desc    add repair orders,
// @access  Private
/**
 *          vehicle_id,
 *          startDate,
            dueDate,
            createdDate,
            isFinished,
             
 * 
 */
router.post('/repairorders/add',passport.authenticate('jwt', { session: false }), (req, res)=>{

    Vehicle.findOne({_id : req.body.vehicle_id}).then(vehicle=>{
        const newRepairOrder={
            startDate: req.body.startDate,
            dueDate: req.body.dueDate,
            createdDate: req.body.createdDate,
            isFinished: req.body.isFinished,
            user: req.user.id, 
           

        };
        
        vehicle.repairOrders.unshift(newRepairOrder);
        vehicle.save().then(vehicle=> res.json(vehicle));

    })

})

// @route   POST api/vehicle/repairorders/parts/add
// @desc    add  parts repair orders,
// @access  Private
//
/**
 *  FIELDS:
 *          repairOrders_id
             
 * 
 */

router.post('/repairorders/parts/add',passport.authenticate('jwt', { session: false }), (req, res)=>{

    Vehicle.findOne({_id : req.body.vehicle_id}).then(vehicle=>{

        const newParts={
            partNumber : req.body.partNumber,
            unitPrice: req.body.unitPrice,
            qty: req.body.qty,
            totalPrice: req.body.totalPrice
           

        };

      

       vehicle.repairOrders.findOne({_id: req.body.repairOrders_id}).then(repairOrder =>{

            

            repairOrder.parts.unshift(newParts);
            console.log(repairOrder);
       }).catch(error=> res.status(500).json(error))
        
        // vehicle.repairOrders.parts.unshift(newParts);
          vehicle.save().then(vehicle=> res.json(vehicle));

    }).catch(error=> res.status(500).json(error))

});
module.exports = router;