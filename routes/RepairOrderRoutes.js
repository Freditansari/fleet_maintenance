

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../config/mongodb');
const passport = require('passport');

const repairOrder = require('../models/RepairOrder')

//todo: 
/**
 * -get repair orders
 *  */ 

// @route   POST api/repairorders/add
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
router.post('/add',passport.authenticate('jwt', { session: false }), (req, res)=>{


        const newRepairOrder=new repairOrder({
            startDate: req.body.startDate,
            dueDate: req.body.dueDate,
            createdDate: req.body.createdDate,
            isFinished: req.body.isFinished,
            user: req.user.id, 
            vehicle: req.body.vehicle_id
           

        });
        

        newRepairOrder.save().then(repairOrder => res.json(repairOrder)).catch(error => res.status(500).json(error));
        
  

})

// @route   POST api/repairorders/parts/add
// @desc    add  parts repair orders,
// @access  Private
//
/**
 *  FIELDS:
 *          repairOrders_id
             
 * 
 */

router.post('/parts/add',passport.authenticate('jwt', { session: false }), (req, res)=>{

    // Vehicle.findOne({_id : req.body.vehicle_id}).then(vehicle=>{

    repairOrder.findOne({_id : req.body.repair_id}).then(repairOrder =>{
        const newParts={
            partNumber : req.body.partNumber,
            unitPrice: req.body.unitPrice,
            qty: req.body.qty,
            totalPrice: req.body.totalPrice
        };

     
        repairOrder.parts.unshift(newParts);
        repairOrder.save()
        .then(repairOrder => res.json(repairOrder))
        .catch(error => res.status(500).json(error));


    })

    

      

    //    vehicle.repairOrders.findOne({_id: req.body.repairOrders_id}).then(repairOrder =>{

            

    //         repairOrder.parts.unshift(newParts);
    //         console.log(repairOrder);
    //    }).catch(error=> res.status(500).json(error))
        
    //     // vehicle.repairOrders.parts.unshift(newParts);
    //       vehicle.save().then(vehicle=> res.json(vehicle));

    // }).catch(error=> res.status(500).json(error))

});
module.exports = router;