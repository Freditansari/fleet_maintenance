const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const fuelConsumptionsSchema = new Schema({
    fuelConsumptions:{
        fuelingDate: {
            type:Date,
            default: Date.now
        },
        fuelAmount: {
            type:Number,
            required: true
        },
        fuelPrice:{
            type:Number,
            required: true
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

module.exports = fuelConsumptions = mongoose.model('fuelconsumptions',fuelConsumptionsSchema);