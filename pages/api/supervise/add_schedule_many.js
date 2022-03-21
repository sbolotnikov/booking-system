// import { getSession } from "next-auth/react";
import nc from 'next-connect';
import Schedule from '../../../models/schedule';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
  onError,
});
handler.post(async (req, res) => {
  await db.connect();
  try {
    const rec = await Schedule.insertMany(req.body);
  } catch (e) {
    print(e);
  }
  res.status(201).json({ message: 'record updated' });
  //Send success response
  await db.disconnect();
  return;
});
export default handler;
