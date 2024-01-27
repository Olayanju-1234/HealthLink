const sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = new sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: 'mysql',
    }
);

console.log(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    process.env.DATABASE_HOST
);

const launchDB = async () => {
    try {
        await connectDB.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

module.exports = launchDB;
