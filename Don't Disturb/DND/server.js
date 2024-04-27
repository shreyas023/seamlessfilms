const nodemailer = require('nodemailer');
const dotenv = require('dotenv'); // Require dotenv if using a .env file

dotenv.config(); // Load environment variables from .env file (if used)

const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail's SMTP server
    auth: {
        user: process.env.EMAIL_USER, // Use environment variable for username
        pass: process.env.EMAIL_PASS  // Use environment variable for password
    }
});

const sendEmail = async (formData) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'shrushti.samant@gmail.com,chunamariom@gmail.com',
            subject: 'Email Form Submission',
            text: `
            Form details:

            Name: ${formData.name}
            Email: ${formData.email}
            Message: ${formData.message}
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.messageId}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false })); // Parse form data

app.get('/', (req, res) => {  // Serve index.html for GET requests
    res.sendFile('index.html', { root: __dirname });
  });

app.post('/submit', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        await sendEmail({ name, email, message });
        res.status(200).send('Form submitted successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error submitting form.');
    }
});

app.listen(3000, () => console.log('Server listening on port 3000'));
