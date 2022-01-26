import nc from 'next-connect';
import { onError } from '../../utils/error';
import { sendEmail } from '../../utils/sendEmail';
const handler = nc({
  onError,
});
handler.post(async(req, res) =>{


  const result = await sendEmail({
      from: req.body.mainEmail,
      to: req.body.mainEmail,
      subject: `Запрос на регистрацию от ${req.body.name}`,
      text: "\n\n Послание от: " + req.body.email + "\n Телефон для подтверждения:"+req.body.phone+"\n\n"+req.body.reg_message,
      html: `<h3 style="width:100%;text-align:left">Послание от:${req.body.email}</h3><h3 style="width:100%;text-align:left">Телефон для подтверждения:
      <strong>${req.body.phone}</strong></h3> <div>${req.body.html_message}</div>`
    })
    const result2 = await sendEmail({
        from: req.body.mainEmail,
        to: req.body.email,
        subject: `Ваше сообщение ${req.body.name} получено. ожидайте звонка`,
        text: "Мы получили ваш заказ: \n "+req.body.reg_message + "Наш оператор скоро свяжется с вами \n\n\n Спасибо за Ваш Заказ \n Служба поддержки",
        html: `<h3 style="width:100%;text-align:center">Мы получили ваш заказ:</h3><div>${req.body.html_message}</div><h3 style="width:100%;text-align:center">Наш оператор скоро свяжется с вами</h3><h3 style="width:100%;text-align:left">Спасибо за Ваш Заказ</h3><h3 style="width:100%;text-align:left">Служба поддержки</h3> `
      })
  console.log("result: ",{result,result2})
  res.status(200).send('Email sent...', {result,result2})
  });
  export default handler;