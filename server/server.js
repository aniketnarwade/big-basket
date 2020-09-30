const express = require('express');
const app=express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

//config cors
app.use(cors());

//config dotenv
dotenv.config({path:'./config/config.env'});

//configure Express to recsive form data
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const hostname = process.env.HOST_NAME;
const port = process.env.PORT;

app.get('/',(request,responce) =>{
    responce.send(`<h2>welcome to bigbasket</h2>`)
});

//connect to mongodb database
mongoose.connect(process.env.MONGODB_LOCAL_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useCreateIndex:true
}).then((responce)=>{
    console.log(`connected to mongodb sucessfully`)
}).catch((err)=>{
    console.error(err);
    process.exit(1); //it stop node js process if unable to connect mongodb

});

//configure the Router
app.use('/api',require('./router/apiRouter'));

app.listen(port,hostname,()=>{
    console.log(`server started at :http://${hostname}:${port}`)
});