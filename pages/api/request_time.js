export default function (req, res) {
    // need query db to get mainEmail
    const nodemailer = require('nodemailer')
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
      subject: `Запрос на регистрацию от ${req.body.name}`,
      text: "\n\n Послание от: " + req.body.email + "\n Телефон для подтверждения:"+req.body.phone+"\n\n"+req.body.reg_message,
      html: `<h3 style="width:100%;text-align:left">Послание от:${req.body.email}</h3><h3 style="width:100%;text-align:left">Телефон для подтверждения:
      <strong>${req.body.phone}</strong></h3> <div>${req.body.html_message}</div>`
    }
    const result = await transporter.sendMail(mailData);
    const mailData2 = {
        from: req.body.mainEmail,
        to: req.body.email,
        subject: `Ваше сообщение ${req.body.name} получено. ожидайте звонка`,
        text: "Мы получили ваш заказ: \n "+req.body.reg_message + "Наш оператор скоро свяжется с вами \n\n\n Спасибо за Ваш Заказ \n Служба поддержки",
        html: `<h3 style="width:100%;text-align:center">Мы получили ваш заказ:</h3><div>${req.body.html_message}</div><h3 style="width:100%;text-align:center">Наш оператор скоро свяжется с вами</h3><h3 style="width:100%;text-align:left">Спасибо за Ваш Заказ</h3><h3 style="width:100%;text-align:left">Служба поддержки</h3> `
      }
      const result2 = await transporter.sendMail(mailData2);
      return {result,result2};
    } catch (error) {
      return error;
    }
  }
  sendMail()
  .then((result) => res.status(200).send('Email sent...', result))
  .catch((error) => res.status(500).send(error.message));
  }