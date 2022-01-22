import nc from 'next-connect';
import Users from '../../../models/userModel';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
const mongoose = require('mongoose');
const handler = nc({
    onError,
  });
handler.post(async (req, res) => {
  const { _id } = req.body;
  await db.connect();
  try {
    const checkExisting =await Users.deleteOne( { _id } );
   res.status(201).json({ message: 'record deleted' });
   await db.disconnect();
   return;
 } catch (e) {
    await db.disconnect();
 }

  
});
export default handler;