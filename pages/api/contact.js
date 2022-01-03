export default function (req, res) {
    // need query db to get mainEmail


    const nodemailer = require('nodemailer');
    const { google } = require('googleapis');
    
    const oAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID_MAIL,
      process.env.CLIENT_SECRET_MAIL,
      process.env.REDIRECT_URI
    );
    oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
    
    async function sendMail() {
      try {
        const accessToken = await oAuth2Client.getAccessToken();
    
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: process.env.EMAIL_SERVER_USER,
            clientId: process.env.CLIENT_ID_MAIL,
            clientSecret: process.env.CLIENT_SECRET_MAIL,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken,
          },
        });
        const mailData = {
          from: req.body.email,
          to: req.body.mainEmail,
          subject: `Message From ${req.body.name}`,
          text: req.body.message + " | Sent from: " + req.body.email,
          html: `<div>${req.body.message}</div><p>Sent from:
          ${req.body.email}</p>`
        }
 
        const result = await transporter.sendMail(mailData);
        return result;
      } catch (error) {
        return error;
      }
    }
    
    sendMail()
      .then((result) => res.status(200).send('Email sent...', result))
      .catch((error) => res.status(500).send(error.message));

  }