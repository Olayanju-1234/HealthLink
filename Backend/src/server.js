const app = require('./app');
const { launchDB } = require('./config/db');

// Connect to database
launchDB()
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
