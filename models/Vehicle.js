const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const VehicleSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['Excavator', 'Light Vehicle', 'Bulldozer', 'Tractors', 'Trucks'], 
      required: true
    },
    model: {
      type: String,
      required: true
    },
    HullNumber:{
      type: String, 
      required:true 
    },
    date: {
      type: Date,
      default: Date.now
    }, 
    FuelLogs:{
      type: Schema.Types.ObjectId,
      ref:"fuellogs"
    }
});

module.exports = Vehicle = mongoose.model('vehicles', VehicleSchema);