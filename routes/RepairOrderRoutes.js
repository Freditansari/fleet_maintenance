

const express = require('express');
const router = express.Router();
const keys = require('../config/mongodb');
const passport = require('passport');

const repairOrder = require('../models/RepairOrder')

//todo: 


// @route   GET api/repairorders/get/:repair_id
// @desc    get a repair order
// @access  Private
/**
 *     n/a because it use parameter         
 * 
 */
router.get('/get/:repair_id',passport.authenticate('jwt', { session: false }), (req, res)=>{

    // console.log(req.params.repair_id);
    repairOrder.findById({_id: req.params.repair_id})
    .then((repairorder=>{
        if(!repairorder){
            res.status(400).json({success:false});
        }

        res.json(repairorder);
    })).catch(error=>res.status(500).json(error));

});


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

    //todo: validation


        const newRepairOrder=new repairOrder({
            startDate: req.body.startDate,
            dueDate: req.body.dueDate,
            createdDate: req.body.createdDate,
            isFinished: req.body.isFinished,
            user: req.user.id, 
            vehicle: req.body.vehicle_id
           

        });
        

        newRepairOrder.save().then(repairOrder => res.json(repairOrder)).catch(error => res.status(500).json(error));
        
  

});

// @route   POST api/repairorders/parts/add
// @desc    add  parts repair orders,
// @access  Private
//
/**
 *  FIELDS:
 *          repair_id,
 *          partNumber
 *          unitPrice
 *          qty
 *          totalPrice
 * 
 */
router.post('/parts/add',passport.authenticate('jwt', { session: false }), (req, res)=>{

    //todo validation

    repairOrder.findOne({_id : req.body.repair_id}).then(repairOrder =>{
        const newParts={
            partNumber : req.body.partNumber,
            unitPrice: req.body.unitPrice,
            qty: req.body.qty,
            totalPrice: req.body.totalPrice
        };

     
        repairOrder.parts.push(newParts);
        repairOrder.save()
        .then(repairOrder => res.json(repairOrder))
        .catch(error => res.status(500).json(error));


    })

});
module.exports = router;