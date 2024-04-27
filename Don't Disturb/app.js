const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const port = 3000 || process.env.PORT;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/send_email', (req, res) => {
    const { name, email, contact } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shreyasbailkar01@gmail.com',
            pass: ''
        }
    });

    const mailOptions = {
        from: email,
        to: 'shrushti.samant@gmail.com',
        subject: 'New form submission',
        text: `The name is ${name}. Contact number is ${contact}.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('success');
        }
    });
});

app.listen(3000, () => console.log(`Server running on port http://localhost:${port}`));
