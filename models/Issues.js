const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const randomString = require("randomstring");

const issueSchema = new Schema({
    // issueNumbers : {
    //     type: String,
    //     default: randomString.generate(7),
    //     unique: true
    // },
    vehicle: {
        type: Schema.Types.ObjectId,
        ref: 'vehicles'
    },
    descriptions:{
        type: String,
        required: true
    },
    comments:[{
        type: Schema.Types.ObjectId,
        ref: "comments"
    }],
    createdBy : {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    dateStart:{
        type: Date,
        default: Date.now
    },
    dateEnd:{
        type:Date
    },
    isOpen:{
        type:Boolean,
        default: true
    }

});

module.exports = Issues = mongoose.model('Issues', issueSchema);