const launchDB = require('./db');
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE = process.env.JWT_EXPIRE;
const GMAIL_USERNAME = process.env.GMAIL_USERNAME;
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;
const clientId = process.env.OAUTH_CLIENT_ID;
const clientSecret = process.env.OAUTH_CLIENT_SECRET;
const RefreshToken = process.env.REFRESH_TOKEN
const AccessToken = process.env.OAUTH_ACCESS_TOKEN;










module.exports = {
    launchDB, JWT_SECRET, JWT_EXPIRE, GMAIL_PASSWORD, GMAIL_USERNAME,
    clientId, clientSecret, AccessToken, RefreshToken
};
