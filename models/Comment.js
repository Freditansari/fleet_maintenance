const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CommentSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref:"users"
    },
    comment:{
        type: String,
        required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    maintenance:{
      type: Schema.Types.ObjectId,
      ref: "maintenances"
    },
    issue:{
      type: Schema.Types.ObjectId,
      ref: "issues"
    }
});

module.exports = comment = mongoose.model('comments', CommentSchema);