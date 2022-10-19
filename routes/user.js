module.exports = server => {
    //Register User
    server.post('/register',(req,res,next)=>{
        const {email,password} = req.body;

        const user = new user({
            email,
            password
        });
          
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(user.password, salt, async(err,hash)=>{
                //Hash Password
                user.password = hash;
                //Save User
                try{
                    const newUser = await user.save();
                    res.send(201);
                    next();
                }catch(err){
                    return next(new errors.InternalError(err.message));
                }
            });
        });

    });
}