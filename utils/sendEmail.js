const sgMail = require('@sendgrid/mail')

export const sendEmail=async(mailData) =>{
  
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  sgMail
    .send(mailData)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
  }
  
