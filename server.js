const express = require('express');
const app = express();

// Use express.raw to capture all content types as Buffer
app.use(express.raw({ type: '*/*' }));

// Single POST endpoint at root path
app.post('/', (req, res) => {
    // Get the incoming Content-Type header, default to text/plain if not provided
    const contentType = req.get('Content-Type') || 'text/plain';

    // Set the response Content-Type to match the request
    res.set('Content-Type', contentType);

    // Return the raw request body unchanged
    // If body is empty, send empty response
    res.send(req.body);
});

// Export the app for testing
module.exports = app;

// Only start the server if this file is run directly
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Echo server listening on port ${PORT}`);
    });
}
