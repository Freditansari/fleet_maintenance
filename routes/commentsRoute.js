const express = require('express');
const router = express.Router();
const passport = require('passport');


//todo load validations here. 
// const validateVehicleInput = require('../validators/Vehicle');



const Issues = require('../models/Issues');
const Comment = require ('../models/Comment');
const User = require('../models/User');
const Maintenance = require('../models/Maintenance');


router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    Comment.find()
    .then(result =>{
        res.status(200).json(result)
    })
    .catch(error =>{
        res.status(500).json(error)
    })

})


// @route   POST api/comments/issues/add
// @desc    post vehicle types end point
// @access  Private
router.post('/issues/add', passport.authenticate('jwt', { session: false }), (req, res) => {

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
            const newCommentUserResult = await User.update(
                {_id: req.user._id}, {$push:{comments: newCommentResult._id}}
            )
            res.status(200).json(newCommentResult)


        }catch(error){
            console.log(error)
            res.status(500).json(error)
        }
    }
    addCommentsToIssue();

})


// @route   POST api/comments/maintenances/add
// @desc    post vehicle types end point
// @access  Private
router.post('/maintenances/add', passport.authenticate('jwt', { session: false }), (req, res) => {

    const addCommentsToMaintenance = async() =>{
        try{
            // add comment with maintenances
            const newComment = new Comment({
                user: req.user._id,
                comment : req.body.comment,
                maintenance: req.body.maintenance_id,
            })
            const newCommentResult = await newComment.save();


            //add comment to issues
            
            const newCommentMaintenanceResult = await Maintenance.update(
                {_id: req.body.maintenance_id}, {$push:{comments: newCommentResult._id}}
            )

            //add comment to User
            const newCommentUserResult = await User.update(
                {_id: req.user._id}, {$push:{comments: newCommentResult._id}}
            )
            res.status(200).json(newCommentResult)

        }catch(error){
            console.log(error)
            res.status(500).json(error)
        }
    }
    addCommentsToMaintenance();

})


//todo delete comments


module.exports=router;