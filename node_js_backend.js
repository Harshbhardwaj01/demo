// server.js - A basic Node.js Express backend
// Make sure to run: npm init -y
// Then install dependencies: npm install express cors

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
// Enable CORS so our frontend (running on a different port/file) can communicate with this API
app.use(cors()); 
// Parse incoming JSON payloads
app.use(express.json());

// Serve the frontend from the same origin as the API.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend_app.html'));
});

// ---------------------------
// API ROUTES
// ---------------------------

// 1. Basic GET Route
// Used to simply fetch data from the server
app.get('/api/message', (req, res) => {
    console.log("GET /api/message was called");
    res.json({ 
        message: "Hello from the backend!", 
        timestamp: new Date().toISOString() 
    });
});

// 2. Basic POST Route
// Used to send data (like a form submission) to the server
app.post('/api/greet', (req, res) => {
    const { name } = req.body;
    console.log(`POST /api/greet was called with name: ${name}`);

    // Basic validation
    if (!name) {
        return res.status(400).json({ error: "Name is required in the request body." });
    }

    // Send back a personalized greeting
    res.json({ greeting: `Welcome to the full-stack world, ${name}!` });
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Backend server is running on http://localhost:${PORT}`);
});