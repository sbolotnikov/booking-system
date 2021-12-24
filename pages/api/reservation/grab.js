// import { getSession } from "next-auth/react";
import nc from 'next-connect';
import Reservation from '../../../models/reservation';
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
  Reservation.updateOne(
    { _id: mongoose.Types.ObjectId(rec.reservation) },
    { $push: { requests: rec._id } }
  )
    .then(function (results) {
        // console.log(results)
      res.send({code:rec._id.toString()});
    })

  //Close DB connection
  await db.disconnect();
});
export default handler;
