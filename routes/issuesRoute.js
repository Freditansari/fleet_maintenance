const express = require('express');
const router = express.Router();
const passport = require('passport');


//todo load validations here. 
// const validateVehicleInput = require('../validators/Vehicle');

// const Issues = require('../models/Issues');
const Vehicles = require('../models/Vehicle');

const { response } = require('express');

const Issues = require('../models/Issues');
const Comment = require ('../models/Comment')
const User = require('../models/User')

// @route   get api/issues/
// @desc    get all available issues
// @access  Private
router.get('/', (req, res) => {
        Issues.find().populate("comments")
        .populate("costs")
        .then(result =>{
            res.status(200).json(result)
        })
        .catch(error =>{
            res.status(500).json(error)
        })

})

// @route   get api/issues/open
// @desc    get all open issues
// @access  Private
router.get('/open', (req, res) => {
    Issues.find({isOpen: true})
    .populate("comments")
    .populate("costs")
    .then(result =>{
        res.status(200).json(result)
    })
    .catch(error =>{
        res.status(500).json(error)
    })

})

// @route   POST api/issues/new
// @desc    post vehicle types end point
// @access  Private
router.post('/new',passport.authenticate('jwt', { session: false }), (req, res) => {   
    const createIssuesAndAddToVehicle= async() =>{
        try {
            const newIssues = new Issues({
                vehicle: req.body.vehicle_id,
                createdBy: req.body.user_id,
                dateStart : ((req.body.date_start)? req.body.date_start: Date.now()),
                descriptions : req.body.descriptions
            })

            const newIssuesResult = await newIssues.save();
            const newIssuesVehicle = await Vehicles.update(
                {_id: req.body.vehicle_id}, 
                {$push:{issues: newIssuesResult._id}})
            const newIssuesUser = await User.update(
                {_id: res.user._id}, 
                {$push:{issues: newIssuesResult._id}})
            res.status(200).json(newIssuesResult);
        }catch(error){
            res.status(500).json(error)
        }
        
    }
    createIssuesAndAddToVehicle()

})

// @route   POST api/issues/delete
// @desc    post vehicle types end point
// @access  Private
router.post('/delete',passport.authenticate('jwt', { session: false }), (req, res) => {   
    
    const removeIssues = async() =>{
        try {
            const issuesDelete = await Issues.deleteOne({_id: req.body.issue_id});
            res.status(200).json(issuesDelete)
            
        } catch (error) {
            res.status(500).json(error)
        }
        
    }

    removeIssues()

})




module.exports=router;