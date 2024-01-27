const app = require('./app');
const connectDB = require('./config/db');

// Connect to database
connectDB()
    .then(() => {
        // Start server
        app.listen(process.env.PORT, () => {
            console.log(`Server started on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
