const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.post('/send-email', async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  // Email Config
  let transporter = nodemailer.createTransport({
    service: 'gmail', // Or your SMTP service
    auth: {
      user: 'legalshops@gmail.com',
      pass: 'skugupta'
    }
  });

  let mailOptions = {
    from: email,
    to: 'yourgmail@gmail.com',
    subject: `New Contact from ${firstName} ${lastName}`,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email.');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
