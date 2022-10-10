const mongoose = require('mongoose');
const timestamp = require('mangoose-timestamp');

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    balance:{
        type:Number,
        default:0
    },

});

customerSchema.plugin(timestamp);

const customer = mongoose.model('customer',customerSchema);
module.exports = customer;