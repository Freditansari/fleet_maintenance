

const express = require('express');
const router = express.Router();
const passport = require('passport');

const breakDown = require('../models/Breakdowns');

router.get('/test', (req, res) => res.json({ msg: 'breakdowns Works' }));

// @route   Post api/breakdowns/add
// @desc    add a vehicle breakdowns
// @access  Private
/**
 * what does it do:
 * adds a breakdown for a vehicle 
 * 
 * created: Fredy   
 * tested by:
 * notes:
 * 
 * functional test ok 
 * fields required:
 * 
 *      reasons,
        vehicle_id
 *     
 * 
 */
router.post('/add',passport.authenticate('jwt', { session: false }), (req, res)=>{

    

    const newbreakDowns=new breakDown({
        reasons: req.body.reasons,
        user: req.user.id,
        vehicle: req.body.vehicle_id
    });
    // console.log(newbreakDowns);

    

    newbreakDowns.save()
    .then(breakdowns=> res.json(breakdowns))
    .catch(error=> res.status(500).json(error));
});

// @route   Post api/breakdowns/update
// @desc    update a vehicle breakdowns
// @access  Private
/**
 * 
 * TODO
 * what does it do:
 * 
 * created:
 * tested by: 
 * notes:
 * functional test ok 
 * fields required:
 *      breakDown_id
 *     
 * 
 */

router.post('/update',passport.authenticate('jwt', { session: false }), (req, res)=>{
    if(req.body.isFinished){
  
        req.body.repairDate = Date.now();
    }

    breakDown.findByIdAndUpdate({_id: req.body.breakDown_id}, req.body, {new :true})
    .then((breakdown) => res.json(breakdown))
    .catch(error => res.status(500).json({message:error}))
});

// @route   Post api/breakdowns/remove
// @desc    remove a vehicle breakdowns
// @access  Private
/**
 * TODO
 * what does it do:
 * 
 * created:
 * tested by:
 * notes:
 * functional test ok 
 * fields required:
 *      breakDown_id
 *     
 * 
 */

router.post('/remove',passport.authenticate('jwt', { session: false }), (req, res)=>{


    breakDown.findByIdAndRemove({_id: req.body.breakDown_id})
    .then(res.json({message: "successfully removed: " + req.body.breakDown_id}))
    .catch(error => res.status(500).json({message:error}))
});







 module.exports = router;