const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'workRecords.json');

app.use(express.json());

// Save records to the server
app.post('/api/saveRecords', (req, res) => {
    const records = req.body;
    fs.writeFile(DATA_FILE, JSON.stringify(records, null, 2), (err) => {
        if (err) {
            console.error('Error saving records:', err);
            return res.status(500).send('Failed to save records.');
        }
        res.send('Records saved successfully.');
    });
});

// Load records from the server
app.get('/api/loadRecords', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Error loading records:', err);
            return res.status(500).send('Failed to load records.');
        }
        res.json(JSON.parse(data));
    });
});

// Serve static files
app.use(express.static(path.join(__dirname)));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
