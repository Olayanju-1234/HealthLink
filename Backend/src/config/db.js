const mongoose = require('mongoose');
require('dotenv').config();
const launchDB = async () => {
    let dbName = '';

    switch (process.env.NODE_ENV) {
        case 'development':
            dbName = process.env.DATABASE_NAME_DEV;
            break;
        case 'production':
            dbName = process.env.DATABASE_NAME_PROD;
            break;
        case 'test':
            dbName = process.env.DATABASE_NAME_TEST;
            break;
        default:
            dbName = process.env.DATABASE_NAME_DEV;
    }

    mongoose.connect(process.env.DATABASE_URL, {dbName});

    const db = mongoose.connection;

    db.on('connected', () => {
        console.log(`Mongoose connected to ${dbName} database`);
    });

    db.on('error', console.error.bind(console, 'connection error:'));

    db.on('disconnected', () => {
        console.log(`Mongoose disconnected from ${dbName} database`);
    }
    );
}

module.exports = { launchDB };
