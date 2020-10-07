const mongoose = require('mongoose');
const DB_URL =  'mongodb+srv://aspock-takehome:g2rV3Y8hJegEy50l@spockcluster.th54m.mongodb.net/takehome-pandemic-edition?retryWrites=true&w=majority';
const connectDB = () => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
    return mongoose.connect(DB_URL, options, err => {
        if(err){
            console.log("Connection to DB failed");
        } else {
            console.log("Connection to DB Success");
        }
    })
};

const db = mongoose.connection;
db.on('error', err => {
    console.error(`Error connecting to DB ${err}`);
});

module.exports =  connectDB;