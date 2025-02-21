// CONNECT TO MY DATABASE
const mongoose = require('mongoose');
require('../models/User');

// TODO change database name
const dbName = 'wildlife'
const connectionString = `mongodb://127.0.0.1:27017/${dbName}`;

module.exports = async (app) => {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('Database connected');

        mongoose.connection.on('error', (err) => {
            console.error('Database Error');
            console.error(err);
        })
    } catch (err) {
        console.error('Error connecting to databse');
        process.exit(1);
    }
}
