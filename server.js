
const express = require('express');
const cors = require('cors');
const db = require('./config/database')

require('dotenv').config()

const app = express();

//middleware

app.use(cors());
app.use(express.json())

//test route

app.get('/',(req,res)=>{
    res.send('Employee Management Backend Running ')
})

//Import Routes 

const authRoute = require('./routes/authRoute');
const empRoute = require('./routes/empRoute');


app.use('/auth',authRoute);
app.use('/employees',empRoute)

//port 

const port = 3000
app.listen(port, ()=>{
    console.log(` server running on localhost: ${port}`)
})