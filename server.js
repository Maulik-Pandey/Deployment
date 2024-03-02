const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bloodbank', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Check if the connection is successful
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

// Check if there is an error connecting to MongoDB
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Define a Mongoose schema for the BloodBank collection
const bloodBankSchema = new mongoose.Schema({
    id: String,
    name: String,
    location: String,
});

// Create a Mongoose model for the BloodBank collection
const BloodBank = mongoose.model('BloodBank', bloodBankSchema);

app.use(bodyParser.json());

// Get all blood banks
app.get('/bloodbanks', async (req, res) => {
    try {
        const bloodBanks = await BloodBank.find();
        res.json(bloodBanks);
    } catch (err) {
        console.error('Error getting blood banks:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a blood bank by ID
app.get('/bloodbanks/:id', async (req, res) => {
    try {
        const bloodBank = await BloodBank.findById(req.params.id);
        if (!bloodBank) {
            return res.status(404).json({ error: 'Blood bank not found' });
        }
        res.json(bloodBank);
    } catch (err) {
        console.error('Error getting blood bank:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add a new blood bank
app.post('/bloodbanks', async (req, res) => {
    try {
        const { name, location } = req.body;
        const newBloodBank = new BloodBank({ name, location });
        await newBloodBank.save();
        res.json(newBloodBank);
    } catch (err) {
        console.error('Error adding blood bank:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a blood bank by ID
app.put('/bloodbanks/:id', async (req, res) => {
    try {
        const { name, location } = req.body;
        const updatedBloodBank = await BloodBank.findByIdAndUpdate(
            req.params.id,
            { name, location },
            { new: true }
        );
        if (!updatedBloodBank) {
            return res.status(404).json({ error: 'Blood bank not found' });
        }
        res.json(updatedBloodBank);
    } catch (err) {
        console.error('Error updating blood bank:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a blood bank by ID
app.delete('/bloodbanks/:id', async (req, res) => {
    try {
        const deletedBloodBank = await BloodBank.findByIdAndDelete(req.params.id);
        if (!deletedBloodBank) {
            return res.status(404).json({ error: 'Blood bank not found' });
        }
        res.json(deletedBloodBank);
    } catch (err) {
        console.error('Error deleting blood bank:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Serve the index.html file for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
