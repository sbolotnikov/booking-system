import nc from 'next-connect';
import { onError } from '../../utils/error';
import { sendEmail } from '../../utils/sendEmail';
const handler = nc({
  onError,
});
handler.post(async(req, res) =>{
    // need query db to get mainEmail

    
    const result = await sendEmail({
      from: req.body.mainEmail,
      to: req.body.mainEmail,
      subject: `Message From ${req.body.name}`,
      text: req.body.message + " | Sent from: " + req.body.email,
      html: `<div>${req.body.message}</div><p>Sent from:
      ${req.body.email}</p>`,
  })
  console.log("result: ",result)
  res.status(200).send('Email sent...', result)
  });
  export default handler;