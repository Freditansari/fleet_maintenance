const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const VehicleSchema = new Schema({
    VehicleName: {
      type: String,
      required: true
    },
    VehicleType: {
      type: String,
      required: true
    },

    Manufacturer:{
        type:String
    },
    Make:{
        type: String
    },
    date: {
      type: Date,
      default: Date.now
    },
    isDecomissioned:{
        type: Boolean,
        default: false
    },
    isOperational:{
        type: Boolean,
        default: true
    },

   

    

  
});

module.exports = Vehicles = mongoose.model('vehicles',VehicleSchema);