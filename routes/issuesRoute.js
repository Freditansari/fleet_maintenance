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
    // todo  Check Validation

   
    const createIssuesAndAddToVehicle= async() =>{
        try {
            const newIssues = new Issues({
                vehicle: req.body.vehicle_id,
                createdBy: req.body.user_id,
                dateStart : ((req.body.date_start)? req.body.date_start: Date.now()),
                descriptions : req.body.descriptions
            })

            const newIssuesResult = await newIssues.save();
            const newIssuesVehicle = await Vehicles.update({_id: req.body.vehicle_id}, {$push:{issues: newIssuesResult._id}})
            const newIssuesUser = await User.update({_id: res.user._id}, {$push:{issues: newIssuesResult._id}})
            res.status(200).json(newIssuesResult);
        }catch(error){
            res.status(500).json(error)
        }
        
    }
    createIssuesAndAddToVehicle()

})

// @route   POST api/issues/comments/add
// @desc    post vehicle types end point
// @access  Private
router.post('/comments/add', passport.authenticate('jwt', { session: false }), (req, res) => {

    const addCommentsToIssue = async() =>{
        try{
            // console.log("hello")
            const newComment = new Comment({
                user: req.user._id,
                comment : req.body.comment,
                issue: req.body.issue_id,
            })

            const newCommentResult = await newComment.save();
            const newCommentIssueResult = await Issues.update(
                {_id: req.body.issue_id}, {$push:{comments: newCommentResult._id}}
            )
            res.status(200).json(newCommentResult)


        }catch(error){
            console.log(error)
            res.status(500).json(error)
        }
    }
    addCommentsToIssue();

})


module.exports=router;