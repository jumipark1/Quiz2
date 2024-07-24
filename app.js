const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

// Create a Schema object
const studentSchema = new mongoose.Schema({
  myName: { type: String, required: true },
  mySID: { type: String, required: true }
});

// Create a Model object
const Student = mongoose.model('s24students', studentSchema);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

app.post('/', async (req, res) => {
  // Using the provided MongoDB URI
  const mongoURI = "mongodb+srv://quiz2:123@cluster0.gezvnqm.mongodb.net/Summer24";

  try {
    // Connect to the database and log the connection
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Add the data to the database
    const newStudent = new Student({
      myName: 'Jumi Park', // replace with your actual name
      mySID: '300306189' // replace with your actual student ID
    });

    await newStudent.save();
    console.log('Document added to collection');

    // Send a response to the user
    res.send('<h1>Document Added</h1>');
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).send(`Internal Server Error: ${error.message}`);
  } finally {
    // Close the connection
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});