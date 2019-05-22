const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const RepairOrdersSchema = new Schema({
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
        vehicle: {
            type: Schema.Types.ObjectId,
            ref: 'vehicles',
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
        
            partNumber:{
                type: String
            },
            unitPrice:{
                type:Number
            },
            qty:{
                type: Number
            },
            totalPrice:{
                type:Number
            }
        }]


   
});

module.exports = RepairOrders = mongoose.model('repairorders',RepairOrdersSchema);