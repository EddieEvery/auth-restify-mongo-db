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

    //geting a single customer
    server.get('/customers/:id',async(req,res,next)=>{
        try{
            const customer = await customer.findById(req.params.id);
            res.send(customer);
            next();
        }catch(err){
            return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`));
        }
    })

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

//Update Customer
server.put('/customers/:id', async (req, res,next)=>{
    //check for JSON 
    if(!req.is('application/json')){
        return next(new errors.InvalidContentError("Expects 'application/json'"));
    }

  try{
    const customer =await customer.findOneAndUpdate({_id: req.params.id},req.body);
    res.send(200);
    next();
  } catch (err){
    return next (new errors.InternalError(
        `There is no customer with the id of ${req.params.id}`
    ));
  }

});

//Delete Customer

server.del('/customers/:id',async(req,res,next)=>{
    try{
        const customer = await customer.findOneAndRemove({_id: req.params.id});
        res.send(204);
        next();
    } catch(err){
        return next(
            new errors.ResourceNotFoundError(
                `There is no customer with the of ${req.params.id}`
            )
        );
    }
});

};