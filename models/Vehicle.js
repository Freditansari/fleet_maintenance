const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const VehicleSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['Excavators', 'Light Vehicles', 'Bulldozers', 'Tractors', 'Trucks', 'Others'], 
      required: true
    },
    model: {
      type: String,
      required: true
    },
    HullNumber:{
      type: String, 
      required:true, 
      unique: true
    },
    date: {
      type: Date,
      default: Date.now
    }, 
    FuelLogs:[{
      type: Schema.Types.ObjectId,
      ref:"fuellogs"
    }],
    isOperational:{
      type: Boolean,
      default: true
    },
    inMaintenance: {
      type: Boolean,
      default: false
    },
    machineHours: [{
      type: Schema.Types.ObjectId,
      ref: "machinehours"
    }],
    maintenances:[{
      type:Schema.Types.ObjectId,
      ref: "maintenances"
    }], 
    issues:[{
      type:Schema.Types.ObjectId,
      ref: "Issues"
    }], 
    reminders:[{
      type: Schema.Types.ObjectId,
      ref: "reminders"
    }],
    isDeleted: {
      type: Boolean,
      default: false,
    }
});

module.exports = Vehicle = mongoose.model('Vehicles', VehicleSchema);