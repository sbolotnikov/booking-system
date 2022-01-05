// import { getSession } from "next-auth/react";
import nc from 'next-connect';
import Schedule from '../../../models/schedule';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
  onError,
});
handler.put(async (req, res) => {
  const { date, location, game, appointments } = req.body;
  await db.connect();

  const rec = await Schedule.updateOne(
    { date, location, game },
    { $set: { appointments } }
  );
  //Send success response
  res.status(201).json({ message: 'Schedule updated', ...rec });
  //Close DB connection
  await db.disconnect();
});
export default handler;
