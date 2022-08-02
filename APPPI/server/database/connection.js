const mongoose = require('mongoose');

const dbUrl = 'mongodb+srv://CodeHubSolution:EWBM6SXOPuBcoQwH@cluster0.xa5usf0.mongodb.net/CodeHubDataBase?retryWrites=true&w=majority'

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

