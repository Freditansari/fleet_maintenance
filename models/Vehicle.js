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

    breakDowns:[{
        reasons:{
            type: String,
            required: true
        },
        date:{
            type:Date,
            default: Date.now
        },
        repairDate:{
            type: Date,
            default: Date.now
        }, 
        isFinished: {
            type: Boolean,
            default: false
        }   
    }],

    machineHours:[{
        machineHour: {
            type: Number, 
            required: true
        },

        date:{
            type: Date,
            default: Date.now
        }
    }],

    repairOrders:[{
        
        startDate:{
            type:Date
        },
        dueDate:{
            type:Date
        },

        createdDate:{
            type:Date,
            default: Date.now
        },

        isFinished: {
            type: Boolean
        },

        user:{
            type: Schema.Types.ObjectId,
            ref:'users',
            required: true
        },

        

        workDescriptions:[{
            workDescriptions:{
                type: String,
                required: true
            },
            manHours:{
                type: Number
            }
        }],

        parts:[{
            qty:{
                type: Number
            },
            partNumber:{
                type: String
            },
            unitPrice:{
                type:Number
            },
            totalPrice:{
                type:Number
            }
        }]


    }],

    fuelsConsumptions:[{
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
        }

    }]

  
});

module.exports = Vehicles = mongoose.model('vehicles',VehicleSchema);