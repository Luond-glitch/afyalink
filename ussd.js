const express = require('express');
const bodyParser = require('body-parser');
const Africastalking = require('africastalking');

const app = express();

// Africastalking credentials
const username = 'Sylvester Omondi';
const apiKey = 'atsk_0e62dc839887f6c711dd3b4f7ef486f7b3261d79792895bdd190e03b528fd955786a5a85';
const africastalking = Africastalking({ username, apiKey });

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Optional - Friendly welcome message for browsers
app.get('/', (req, res) => {
    res.send(' AfyaLink Rural USSD server is running fine.');
});

// USSD Route
app.post('/ussd', (req, res) => {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;

    let response = '';

    if (text === '') {
        response = `CON Welcome to AfyaLink 
1. Find Nearest Hospital
2. Emergency Help
3. Health Tips
4. Register Emergency contact`;
    } else if (text === '1') {
        response = `CON Enter your area or sub-county name:`;
    } else if (text.startsWith('1*')) {
        const location = text.split('*')[1];
        response = `END Searching for hospitals near ${location}... (feature coming soon!)`;
    } else if (text === '2') {
        response = `END Our emergency team will contact you shortly. Stay Calm.`;
    } else if (text === '3') {
        response = `END Health Tip: Drink clean water and wash hands regularly!`;
    } else if (text === '4') {
        response = `CON Enter the phone number of your emergency contact:`;
    } else if (text.startsWith('4*')) {
        const emergencyNumber = text.split('*')[1];
        response = `END Thank you! We have saved your emergency contact: ${emergencyNumber}`;
    } else {
        response = `END Invalid choice. Try again.`;
    }
    

    res.set('Content-Type', 'text/plain');
    res.send(response);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` AfyaLink Rural USSD app running on port ${PORT}`);
});
