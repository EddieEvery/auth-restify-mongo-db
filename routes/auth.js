const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const httpErrors = require('restify-errors/lib/httpErrors');
const User = mongoose.model('User');
const auth = require('../auth');

exports.authenticate = (email, password) =>{
    return new Promise(async(resolve, reject)=>{
  try{
    //Get user by email
    const user = await User.findOne({email});

    //Match Password
    bcrypt.compare(password,user.password,(err,isMatch)=>{
        if(err) throw err;
        if(isMatch){
            // Pass didn't match
            reject('Authentication Failed');
        }
    });
  }catch(err){
    //email not found
    reject('Authentication Failed');
  }

    });

    //Auth User
    server.post('/auth',async(req,res,next)=>{
        const{email,password} =req.body;

        try{
            //Authenticate User
            const user = await auth.authenticate(email,password);
            next()
        } catch(err){
            // User unauthorized
            return next(new errors.UnauthorizedError(err));
        }
    });
};