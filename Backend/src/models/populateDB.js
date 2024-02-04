const mongoose = require('mongoose');
const UserModel = require('./user.model');

// Connect to MongoDB
mongoose.connect('mongodb+srv://devcareer:devcareer@cluster0.znob8m7.mongodb.net/healthlink-prod?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  // Define sample data
  const userData = [
    {
      first_name: 'John',
      last_name: 'Doe',
      username: 'johndoe',
      email: 'john@example.com',
      phone_number: '1234567890',
      password: 'password123',
      country: 'USA',
      city: 'New York',
      state: 'NY',
      postal_code: '10001',
      account_type: 'client',
      isVerified: true
    },
    {
      first_name: 'Jane',
      last_name: 'Smith',
      username: 'janesmith',
      email: 'jane@example.com',
      phone_number: '9876543210',
      password: 'password456',
      country: 'Canada',
      city: 'Toronto',
      state: 'ON',
      postal_code: 'M5V 2T6',
      account_type: 'therapist',
      isVerified: false,
      specialty: 'Anxiety Disorders'
    },
    {
      first_name: 'Alice',
      last_name: 'Johnson',
      username: 'alicejohnson',
      email: 'alice@example.com',
      phone_number: '5555555555',
      password: 'password789',
      country: 'UK',
      city: 'London',
      state: 'England',
      postal_code: 'SW1A 1AA',
      account_type: 'client',
      isVerified: true
    },
    {
      first_name: 'Dr. Emily',
      last_name: 'Jones',
      username: 'emilyjones',
      email: 'emily@example.com',
      phone_number: '9999999999',
      password: 'password456',
      country: 'Germany',
      city: 'Berlin',
      state: 'Berlin',
      postal_code: '10115',
      account_type: 'therapist',
      isVerified: true,
      specialty: 'Relationship Counseling'
    },
    {
      first_name: 'Michael',
      last_name: 'Williams',
      username: 'michaelwilliams',
      email: 'michael@example.com',
      phone_number: '7777777777',
      password: 'password789',
      country: 'France',
      city: 'Paris',
      state: 'Île-de-France',
      postal_code: '75001',
      account_type: 'client',
      isVerified: true
    },
    {
      first_name: 'Dr. Sarah',
      last_name: 'Davis',
      username: 'sarahdavis',
      email: 'sarah@example.com',
      phone_number: '8888888888',
      password: 'password101',
      country: 'Spain',
      city: 'Madrid',
      state: 'Madrid',
      postal_code: '28001',
      account_type: 'therapist',
      isVerified: false,
      specialty: 'PTSD Treatment'
    },
    {
      first_name: 'David',
      last_name: 'Taylor',
      username: 'davidtaylor',
      email: 'david@example.com',
      phone_number: '4444444444',
      password: 'passwordxyz',
      country: 'Italy',
      city: 'Rome',
      state: 'Lazio',
      postal_code: '00100',
      account_type: 'client',
      isVerified: false
    },
    {
      first_name: 'Olivia',
      last_name: 'Wilson',
      username: 'oliviawilson',
      email: 'olivia@example.com',
      phone_number: '2222222222',
      password: 'password123',
      country: 'Netherlands',
      city: 'Amsterdam',
      state: 'North Holland',
      postal_code: '1012 JS',
      account_type: 'client',
      isVerified: true
    },
    {
      first_name: 'Dr. Daniel',
      last_name: 'Martinez',
      username: 'danielmartinez',
      email: 'daniel@example.com',
      phone_number: '3333333333',
      password: 'password456',
      country: 'Brazil',
      city: 'São Paulo',
      state: 'São Paulo',
      postal_code: '01000-000',
      account_type: 'therapist',
      isVerified: true,
      specialty: 'Family Therapy'
    },
    {
      first_name: 'Daniel',
      last_name: 'Brown',
      username: 'danielbrown',
      email: 'daniel2@example.com',
      phone_number: '3333333333',
      password: 'password456',
      country: 'Brazil',
      city: 'São Paulo',
      state: 'São Paulo',
      postal_code: '01000-000',
      account_type: 'client',
      isVerified: true
    },
    // Repeat the above data with unique details to reach 20 entries
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
