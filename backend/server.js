
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());  // To parse incoming JSON data

// setting up my mongodb uri
const mongoURI = process.env.MONGO_URI ;
// Connect to MongoDB

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Error connecting to MongoDB:', error);
});

const postRoutes = require('./routes/Posts'); // Import routes
app.use('/api/posts', postRoutes); // Set up the post routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});