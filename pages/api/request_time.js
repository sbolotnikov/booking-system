export default function (req, res) {
    // need query db to get mainEmail
    require('dotenv').config()
    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
      port: process.env.EMAIL_SERVER_PORT,
      host: process.env.EMAIL_SERVER_HOST,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
      secure: true,
    })
    
    const mailData = {
      from: req.body.email,
      to: req.body.mainEmail,
      subject: `Запрос на регистрацию от ${req.body.name}`,
      text: "\n\n Послание от: " + req.body.email + "\n Телефон для подтверждения:"+req.body.phone+"\n\n"+req.body.reg_message,
      html: `<h3 style="width:100%;text-align:left">Послание от:${req.body.email}</h3><h3 style="width:100%;text-align:left">Телефон для подтверждения:
      <strong>${req.body.phone}</strong></h3> <div>${req.body.html_message}</div>`
    }
    transporter.sendMail(mailData, function (err, info) {
      if(err){
        console.log(err)
        res.status(500).send('Server error');
      }
      // else
        // console.log(info)
    })
    const mailData2 = {
        from: req.body.mainEmail,
        to: req.body.email,
        subject: `Ваше сообщение ${req.body.name} получено. ожидайте звонка`,
        text: "Мы получили ваш заказ: \n "+req.body.reg_message + "Наш оператор скоро свяжется с вами \n\n\n Спасибо за Ваш Заказ \n Служба поддержки",
        html: `<h3 style="width:100%;text-align:center">Мы получили ваш заказ:</h3><div>${req.body.html_message}</div><h3 style="width:100%;text-align:center">Наш оператор скоро свяжется с вами</h3><h3 style="width:100%;text-align:left">Спасибо за Ваш Заказ</h3><h3 style="width:100%;text-align:left">Служба поддержки</h3> `
      }
      transporter.sendMail(mailData2, function (err, info) {
        if(err){
          console.log(err)
          res.status(500).send('Server error');
        }
        // else
          // console.log(info)
      })
    res.status(200).send('Success! Email sent');
  }