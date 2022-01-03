export default function (req, res) {
    // need query db to get mainEmail
    require('dotenv').config()
    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
      secure: true,
    })
    const mailData = {
      from: req.body.email,
      to: req.body.mainEmail,
      subject: `Message From ${req.body.name}`,
      text: req.body.message + " | Sent from: " + req.body.email,
      html: `<div>${req.body.message}</div><p>Sent from:
      ${req.body.email}</p>`
    }
    transporter.sendMail(mailData, function (err, info) {
      if(err){
        console.log(err)
        res.status(500).send('Server error', err);
      }
      else
        console.log(info)
    })
    res.status(200).send('Success! Email sent');
  }