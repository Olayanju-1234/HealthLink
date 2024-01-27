const app = require('./app');
const connectDB = require('./config/db');

// Connect to database
connectDB().then(() => {
    console.log('Database connected');

    // Start server
    app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    });
});
