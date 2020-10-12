const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CommentSchema = new Schema({
    name: {
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
    }
});

module.exports = comment = mongoose.model('comments', CommentSchema);