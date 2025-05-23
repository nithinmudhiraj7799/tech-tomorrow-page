const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const validateForm = require('./utils/validateForm');
const rateLimiter = require('./middleware/rateLimiter');


const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(rateLimiter);


app.post('/api/feedback', (req, res) => {
    const feedback = req.body;
    
    // Validate form input
    const validation = validateForm(feedback);
    if (!validation.valid) {
        return res.status(400).json({ success: false, message: validation.message });
    }

    // Load existing feedbacks
    const filePath = path.join(__dirname, 'feedbacks.json');
    let existingFeedbacks = [];

    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        existingFeedbacks = JSON.parse(data);
    }

    // Add new feedback
    existingFeedbacks.push({ ...feedback, timestamp: new Date().toISOString() });

    // Save to JSON
    fs.writeFileSync(filePath, JSON.stringify(existingFeedbacks, null, 2));

    res.status(200).json({ success: true, message: 'Feedback submitted successfully.' });
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
