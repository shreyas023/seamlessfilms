const nodemailer = require('nodemailer');
const dotenv = require('dotenv'); // Require dotenv if using a .env file
const path = require('path'); // To handle file paths

dotenv.config(); // Load environment variables from .env file

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail's SMTP server
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (formData, subject) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: `
        ${subject === 'Email Form Submission' ? 'shrushti.samant@gmail.com' : 'chunamariom@gmail.com'}`, // Replace with recipient emails
      subject: subject, // Set subject based on form
      text: `
        ${subject === 'Email Form Submission' ? `
          Form details:

          Name: ${formData.name}
          Email: ${formData.email}
          Contact: ${formData.contact}
        ` : `
          Warranty Form Submission:

          Customer Details:

          Name: ${formData.fname} ${formData.lname}
          Email: ${formData.wemail}
          Address: ${formData.saddress}
          City: ${formData.city}
          State: ${formData.state}
          ZIP Code: ${formData.zip}

          Vehicle Details:

          Vehicle Model: ${formData.vmodel}
          Vehicle Make: ${formData.vmake}
          Service Date: ${formData.date}

          Product Type: ${formData.opt1}
        `}
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

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, 'client'))); // Assuming client folder

// Routes for your HTML pages
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'client' }); // Serve index.html from client
});

app.get('/contact', (req, res) => {
  // Add similar routes for other HTML pages (contact.html, etc.)
  res.sendFile('contact.html', { root: 'client' }); // Serve contact.html from client
});

app.get('/warranty', (req, res) => {
  res.sendFile('warranty.html', { root: 'client' }); // Serve warranty.html from client
});

app.get('/blog', (req, res) => {
  res.sendFile('blog.html', { root: 'client' }); // Serve blog.html from client
});

app.get('/matteppf', (req, res) => {
    res.sendFile('matteppf.html', { root: 'client' }); // Serve matteppf.html from client
});

app.get('/clearppf', (req, res) => {
    res.sendFile('clearppf.html', { root: 'client' }); // Serve clearppf.html from client
});

// Route to handle form submission from contact.html
app.post('/submit', async (req, res) => {
  const { name, email, contact } = req.body;

  try {
    await sendEmail({ name, email, contact }, 'Email Form Submission');
    res.sendFile('thankyou.html', { root: 'client' }); // Redirect to thank you page
  } catch (error) {
    console.error(error);
    res.status(500).send('Error submitting form.');
  }
});

// Route to handle form submission from warranty.html
app.post('/claim',  async (req, res) => {
  const { fname, lname, saddress, city, state, zip, wemail, vmodel, vmake, date, opt1 } = req.body;
  
  try {
    await sendEmail({ fname, lname, saddress, city, state, zip, wemail, vmodel, vmake, date, opt1}, 'Warranty Form Submission');
    
    res.sendFile('thankyou.html', { root: 'client' }); // Redirect to thank you page
  } catch (error) {
    console.error(error);
    res.status(500).send('Error submitting form.');
  }
});

app.listen(process.env.PORT, () => console.log(`Server listening on port http://localhost:${process.env.PORT}`));
