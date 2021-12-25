// import { getSession } from "next-auth/react";
import nc from 'next-connect';
import Template from '../../../models/template';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
const mongoose = require('mongoose');
const handler = nc({
    onError,
  });
handler.post(async (req, res) => {
  const { id } = req.body;
  console.log(req.body)
  await db.connect();
  try {
    const checkExisting =await Template.deleteOne( { "_id":mongoose.Types.ObjectId(id) } );
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