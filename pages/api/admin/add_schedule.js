// import { getSession } from "next-auth/react";
import nc from 'next-connect';
import Schedule from '../../../models/schedule';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
    onError,
  });
handler.post(async (req, res) => {
  const { date, location, game, appointments, color,title} = req.body;
  await db.connect();
  const checkExisting = await Schedule.findOne({
    date,location,game
  });
  if (checkExisting) {
    const rec = await Schedule.updateOne(
      {date,location,game },
      { $set: { appointments, color,title} })
    res.status(201).json({ message: 'record updated' });
    await db.disconnect();
    return;
    
  }
  const newSchedule = new Schedule(req.body);
  const status = await newSchedule.save();
  //Send success response
  res.status(201).json({ message: 'Schedule created/updated', ...status });
  //Close DB connection
  await db.disconnect();
});
export default handler;