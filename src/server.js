const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

// Initialize app Express
const app = express();

// Define the port on which the server will listen
const port = process.env.PORT || 3000;

// Configure CORS to allow requests from any origin with credentials
app.use(cors({
    origin: true,
    credentials: true
}));

// Middleware for logging requests
app.use(morgan('combined'));

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from node_modules
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

// Use routes
app.use('/api', require('./routes/bidRoutes'));
app.use('/api', require('./routes/healthRoutes'));

// Catch all route for 404 errors
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Mock server listening on http://localhost:${port}`);
});
