// import { getSession } from "next-auth/react";
import nc from 'next-connect';
import Request from '../../../models/request';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
const mongoose = require('mongoose');
const handler = nc({
  onError,
});
handler.post(async (req, res) => {
  await db.connect();
  const newRequest = new Request(req.body);
  const status = await newRequest.save();
  const rec = await Request.findOne(req.body);
  res.status(201).send({ code: rec._id.toString() });
  //Close DB connection
  await db.disconnect();
});
export default handler;
