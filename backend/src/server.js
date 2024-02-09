const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package

const Contact = require('./models/contactModels');

const app = express()

// Enable CORS for all routes from frontend
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specified HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specified headers
}));


const PORT = 3000;

// Middleware
app.use(bodyParser.json());


// Routes
const itemsRouter = require('./routes/contactRoutes');
app.use('/api/contactRoutes', itemsRouter);


// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/react-task-users', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');


    // Delete all documents from the collection
    Contact.deleteMany({})
      .then(() => {
        console.log('All data cleared from the collection.');
      })
      .catch(err => console.error('Error clearing data:', err));
    
    // Start server
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));

