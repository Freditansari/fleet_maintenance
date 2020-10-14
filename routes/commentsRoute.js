const express = require('express');
const router = express.Router();
const passport = require('passport');


//todo load validations here. 
// const validateVehicleInput = require('../validators/Vehicle');



const Issues = require('../models/Issues');
const Comment = require ('../models/Comment')


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
            res.status(200).json(newCommentResult)


        }catch(error){
            console.log(error)
            res.status(500).json(error)
        }
    }
    addCommentsToIssue();

})


module.exports=router;