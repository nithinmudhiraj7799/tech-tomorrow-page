const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimiter = require('./middleware/rateLimiter');
const Message = require("./message_model");
const Database = require('./database');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
Database()

app.post('/api/feedback',rateLimiter, (req, res) => {
    try {
        const { name, email, message } = req.body
        if(!name || !email || !message){
            return res.status(400).json({message:"all fieldes are required "})
        }
        const newMessage = new Message({
            name, email, message
        })
        newMessage.save()
        return res.status(201).json({ message: "feedback sent successfully", newMessage })
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server errror", error:error.message})
    }
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
