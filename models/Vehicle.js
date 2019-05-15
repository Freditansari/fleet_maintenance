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
    date: {
      type: Date,
      default: Date.now
    },
    isOperational:{
        type: Boolean,
        default: true
    },

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

        isDone: {
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

    Fuel:[{
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
        }
    }]

  
});

module.exports = Vehicle = mongoose.model('vehicles',VehicleSchema);