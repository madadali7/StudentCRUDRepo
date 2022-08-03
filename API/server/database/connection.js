const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: 'config.env'})
const dbUrl = process.env.DB_URL

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connectDB = async ()=>{
    mongoose.connect(dbUrl, connectionParams).then(() => {
        console.log('Connected to DB');
    }).catch((e) => {
        console.log('Error', e);
    })
}

module.exports = connectDB;

