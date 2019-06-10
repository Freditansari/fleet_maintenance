

const express = require('express');
const router = express.Router();
const passport = require('passport');

const breakDowns = require('../models/Breakdowns');

router.get('/test', (req, res) => res.json({ msg: 'breakdowns Works' }));

// @route   GET api/breakdowns/get
// @desc    get a vehicle breakdowns
// @access  Private
/**
 *     n/a because it use parameter         
 * 
 */
router.get('/get/',passport.authenticate('jwt', { session: false }), (req, res)=>{

    // console.log(req.params.repair_id);
   

});




 module.exports = router;