// import { getSession } from "next-auth/react";
import nc from 'next-connect';
import Reservation from '../../../models/reservation';
import Request from '../../../models/request';
import Schedule from '../../../models/schedule';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
const mongoose = require('mongoose');
const handler = nc({
  onError,
});
handler.post(async (req, res) => {
  const { schedule_id } = req.body;
  await db.connect();
  const newRequest = new Request(req.body);
  const status = await newRequest.save();
  const rec = await Request.findOne(req.body);
  const rSch = await Schedule.updateOne(
    { appointments: { $elemMatch: { _id: schedule_id } } },
    { $set: { 'appointments.$.status': 'orange' } }
  );
  console.log(rSch);
  res.status(201).send({ code: rec._id.toString() });
  //Close DB connection
  await db.disconnect();
});
export default handler;
