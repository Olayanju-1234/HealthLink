const mongoose = require('mongoose');
const UserModel = require('./user.model');

// Connect to MongoDB
mongoose.connect('x', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, {dbName: 'healthlink-dev'})
.then(() => {
  console.log('Connected to MongoDB');
  // Define sample data
  const userData = [
    {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      phone_number: '1234567890',
      password: 'password123',
      country: 'USA',
      account_type: 'client',
      isVerified: true
    },
    {
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane@example.com',
      phone_number: '9876543210',
      password: 'password456',
      country: 'Canada',
      account_type: 'therapist',
      isVerified: false
    },
    {
      first_name: 'Alice',
      last_name: 'Johnson',
      email: 'alice@example.com',
      phone_number: '5555555555',
      password: 'password789',
      country: 'UK',
      account_type: 'client',
      isVerified: true
    },
    {
      first_name: 'Bob',
      last_name: 'Smith',
      email: 'bob@example.com',
      phone_number: '1111111111',
      password: 'passwordabc',
      country: 'Australia',
      account_type: 'client',
      isVerified: true
    },
    {
      first_name: 'Emily',
      last_name: 'Jones',
      email: 'emily@example.com',
      phone_number: '9999999999',
      password: 'passwordxyz',
      country: 'Germany',
      account_type: 'therapist',
      isVerified: true
    },
    {
      first_name: 'Michael',
      last_name: 'Brown',
      email: 'michael@example.com',
      phone_number: '7777777777',
      password: 'password789',
      country: 'France',
      account_type: 'client',
      isVerified: true
    },
    {
      first_name: 'Sarah',
      last_name: 'Wilson',
      email: 'sarah@example.com',
      phone_number: '8888888888',
      password: 'password101',
      country: 'Spain',
      account_type: 'therapist',
      isVerified: false
    },
    {
      first_name: 'David',
      last_name: 'Clark',
      email: 'david@example.com',
      phone_number: '4444444444',
      password: 'passwordxyz',
      country: 'Italy',
      account_type: 'client',
      isVerified: false
    },
    {
      first_name: 'Olivia',
      last_name: 'Taylor',
      email: 'olivia@example.com',
      phone_number: '2222222222',
      password: 'password123',
      country: 'Netherlands',
      account_type: 'client',
      isVerified: true
    },
    {
      first_name: 'Daniel',
      last_name: 'Martinez',
      email: 'daniel@example.com',
      phone_number: '3333333333',
      password: 'password456',
      country: 'Brazil',
      account_type: 'therapist',
      isVerified: true
    }
  ];
  

  // Insert sample data into the database
  UserModel.insertMany(userData)
  .then((docs) => {
    console.log('Data inserted successfully:');
    console.log(docs);
  })
  .catch((err) => {
    console.error('Error inserting data:', err);
  })
  .finally(() => {
    // Close the connection after inserting data
    mongoose.connection.close();
  });
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});
