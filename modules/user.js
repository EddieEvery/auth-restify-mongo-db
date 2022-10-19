const mongoose =require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    }
});

const user = mongoose.model('User',UserSchema);
module.exports = user;