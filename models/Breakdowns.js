const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const breakDownsSchema = new Schema({
    breakDowns:{
        reasons:{
            type: String,
            required: true
        },
        date:{
            type:Date,
            default: Date.now
        },
        repairDate:{
            type: Date
        }, 
        isFinished: {
            type: Boolean,
            default: false
        },
        user:{
            type: Schema.Types.ObjectId,
            ref:'users',
            required: true
        },
        vehicle:{
            type: Schema.Types.ObjectId,
            ref:'vehicle',
            required: true
        },   
    }
      
});

module.exports = breakDowns = mongoose.model('breakdowns',breakDownsSchema);