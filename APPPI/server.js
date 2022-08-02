const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config({path: 'config.env'})
const PORT = process.env.PORT;

app.use(morgan('tiny'));

connectDB();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.use(cors({
    origin: '*'
}));

//Load Routers
app.use('/',require('./server/routes/router'));

app.listen(PORT, ()=>{
    console.log(`Server is Running http://localhost:${PORT}`);
}) 