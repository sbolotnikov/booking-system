// import { getSession } from "next-auth/react";
import nc from 'next-connect';
import Schedule from '../../../models/schedule';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
const mongoose = require('mongoose');
const handler = nc({
  onError,
});
handler.put(async (req, res) => {
  const { date,game, location, schedule_id } = req.body;
  await db.connect();
  const rSch = await Schedule.updateOne(
    { date, game, location, appointments: { $elemMatch: { _id: schedule_id } } },
    { $set: { 'appointments.$.status': 'orange' } }
  );
  res.send(rSch);
  //Close DB connection
  await db.disconnect();
});
export default handler;