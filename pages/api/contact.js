import nc from 'next-connect';
import { onError } from '../../utils/error';
const handler = nc({
  onError,
});
handler.post(async(req, res) =>{
    // need query db to get mainEmail


    const nodemailer = require('nodemailer');

    async function sendMail() {
        let transporter = nodemailer.createTransport(
      {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_SERVER_USER, // generated ethereal user
          pass: process.env.EMAIL_SERVER_PASSWORD // generated ethereal password
        }
      }
      );
      const result = await transporter.sendMail({
        from: req.body.email,
        to: req.body.mainEmail,
        subject: `Message From ${req.body.name}`,
        text: req.body.message + " | Sent from: " + req.body.email,
        html: `<div>${req.body.message}</div><p>Sent from:
        ${req.body.email}</p>`,
    });
        console.log("result: ",result)
        res.status(200).send('Email sent...', result)
        return 

    }
    
    sendMail()
  });
  export default handler;