

const express = require('express');
const router = express.Router();
const passport = require('passport');

const breakDowns = require('../models/Breakdowns');

router.get('/test', (req, res) => res.json({ msg: 'breakdowns Works' }));

// @route   Post api/breakdowns/add
// @desc    add a vehicle breakdowns
// @access  Private
/**
 *     
 * 
 */
router.post('/add',passport.authenticate('jwt', { session: false }), (req, res)=>{

    // console.log(req.params.repair_id);

    const newBreakDowns = new breakDowns({
        reasons: req.body.reasons,
        user: req.user.id,
        vehicle: req.vehicle.id
    });
   

});




 module.exports = router;