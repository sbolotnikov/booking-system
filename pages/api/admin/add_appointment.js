// import { getSession } from "next-auth/react";
import nc from 'next-connect';
import Template from '../../../models/template';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
    onError,
  });
handler.post(async (req, res) => {
  const { name, appointment } = req.body;
  await db.connect();
  const template = await Template.findOne({
    name: name,
  });
  console.log(template.appointments);
  const appt=template.appointments.find((x) => ((x.reservationHour === appointment.reservationHour)&&(x.reservationMin === appointment.reservationMin)))
  if (appt) {
    res.status(422).json({ message: 'record already exists' });
    await db.disconnect();
    return;
  }
  Template.updateOne(
    { name: name },
    { $push: { appointments: appointment } }
  )
    .then(function (results) {
        // console.log(results)
        res.status(201).json({ message: 'Appointment created', });
    })
  //Send success response

  //Close DB connection
  await db.disconnect();
});
export default handler;