const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// User Details
const user_id = "john_doe_17091999";
const email = "john@xyz.com";
const roll_number = "ABCD123";

// POST /bfhl endpoint
app.post('/bfhl', (req, res) => {
    const data = req.body.data;

    // Validate that data is an array
    if (!Array.isArray(data)) {
        return res.status(400).json({
            "is_success": false,
            "user_id": user_id,
            "status": "Invalid input"
        });
    }

    // Separate numbers and alphabets
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item) && item.length === 1);

    // Determine the highest alphabet
    const highestAlphabet = alphabets.reduce((max, char) => {
        char = char.toUpperCase();
        return max < char ? char : max;
    }, '');

    const response = {
        "is_success": true,
        "user_id": user_id,
        "email": email,
        "roll_number": roll_number,
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_alphabet": highestAlphabet !== '' ? [highestAlphabet] : []
    };

    res.json(response);
});

// GET /bfhl endpoint
app.get('/bfhl', (req, res) => {
    const operation_code = 1;
    res.json({ operation_code });
});

// Set the port and start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
