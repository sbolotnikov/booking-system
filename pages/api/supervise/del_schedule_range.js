import nc from 'next-connect';
import Schedule from '../../../models/schedule';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
const mongoose = require('mongoose');
const handler = nc({
    onError,
  });
handler.post(async (req, res) => {
  const { game, location, dateStart, dateFinish } = req.body;
  console.log(game, location, dateStart, dateFinish )
  await db.connect();
  try {
    const checkExisting =await Schedule.deleteMany( {date: { $gte: dateStart , $lte: dateFinish } ,location:location , game: game } );
   res.status(201).json({ message: 'record deleted' });
   await db.disconnect();
   return;
 } catch (e) {
    await db.disconnect();
 }

  
});
export default handler;