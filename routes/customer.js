const errors = require('restify-errors');
const customer = require('../modules/customers');
const customer = require('/models/customer')

module.exports = server => {
    //acquiring customers from the database
    server.get('/customer', async (req,res, next)=>{
     try{
        const customers = await customer.find({});
        res.send(customers);
        next();
     }catch(err){
        next(new errors.InvalidContentError(err))
     }
    });

    // adding customers to the database
    server.post('/customers',async (req, res, next)=>{

        //check for the content type 'JSON'
        if(!req.is('applicatin/json')){
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }
        const {name,email,balance} =req.body;

        const customer =new customer({
             name,
             email,
             balance
        });
        // save it to the database

        try{
            const newCustomer = await customer.save();
            res.send(201);
            next();
        }catch(err){
return next(new errors.InternalError(err.message));
        }
    });
};

