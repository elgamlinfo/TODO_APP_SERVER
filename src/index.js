require('dotenv').config();
require('./db/mongoose.js');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
var bodyParser = require('body-parser')

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');


const app = express();


//--------------------parse application/x-www-form-urlencoded--------------------/
app.use(bodyParser.urlencoded({ extended: false }))


//--------------------parse application/json--------------------//
app.use(bodyParser.json())


//--------------------helmet for http/https security--------------------//
app.use(helmet());


//--------------------cors for another domains requestes--------------------//
app.use(cors());


//--------------------routers hundelers--------------------//
app.use(userRouter);
app.use(taskRouter);





app.listen(process.env.PORT, () => console.log(`App Listen At http://localhost:${process.env.PORT}/`));