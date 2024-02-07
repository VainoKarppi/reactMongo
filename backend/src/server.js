const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express()


const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/react-task-users', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));



// Routes
const itemsRouter = require('./routes/contactRoutes');
app.use('/api/contactRoutes', itemsRouter);


app.get('/', function (req, res) { res.send('Hello World') })


// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));