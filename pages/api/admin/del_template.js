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
  await db.connect();
    const checkExisting =await Template.deleteOne( { "_id":mongoose.Types.ObjectId(id) } );
   res.status(201).json({ message: 'record deleted' });
   await db.disconnect();
   return;
  
});
export default handler;