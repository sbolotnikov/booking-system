// import { getSession } from "next-auth/react";
import nc from 'next-connect';
import Schedule from '../../../models/schedule';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
const mongoose = require('mongoose');
const handler = nc({
    onError,
  });
handler.post(async (req, res) => {
  const { date } = req.body;
  console.log(req.body)
  await db.connect();
  try {
    const checkExisting =await Schedule.deleteOne( { date } );
    console.log(checkExisting);
   res.status(201).json({ message: 'record deleted' });
   await db.disconnect();
   return;
 } catch (e) {
    console.log(e)
    await db.disconnect();
 }

  
});
export default handler;