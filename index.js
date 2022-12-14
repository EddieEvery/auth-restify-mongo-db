const restify =require('restify');
const mongoose = require('mongoose');
const config = require('./config');

const server = restify.createServer();

//Middleware
server.use(restify.plugins.bodyParser());

server.listen(config.PORT,()=>{
    mongoose.set('useFindAndModify',false);
    mongoose.connect(config.MONGODB_URL,{userNewUrlParser:true});
});

//initialiaze DB variables

const db = mongoose.connection;

// handling mongo db errors

db.on('error',err => console.log(err));

db.once('open',()=>{
    require('./routes/customers')(server);
    require('./routes/user')(server);
    console.log(`Server started on port ${config.PORT}`);
});