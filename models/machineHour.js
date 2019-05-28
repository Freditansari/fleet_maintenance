const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const machineHourSchema = new Schema({

    machineHours:{
        machineHour: {
            type: Number, 
            required: true
        },
        user:{
            type: Schema.Types.ObjectId,
            ref:'users',
            required: true
        },

        date:{
            type: Date,
            default: Date.now
        }
    }  
      
});

module.exports = machineHours = mongoose.model('machinehoues',machineHourSchema);