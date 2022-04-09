// import { getSession } from "next-auth/react";
import nc from 'next-connect';
import Schedule from '../../../models/schedule';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
const mongoose = require('mongoose');
const handler = nc({
  onError,
});
handler.put(async (req, res) => {
  const { date,game, location, hours, minutes, color } = req.body;
  let blocked=[]
  await db.connect();
  if (game!==5){
    const res2 = await await Schedule.updateOne(
        { date, game:5, location, appointments: { $elemMatch: { reservationHour: hours, reservationMin:minutes } } },
        { $set: { 'appointments.$.status': color } }
      );
    console.log("block big labirinth ",res2);
    blocked.push("block big labirinth ");
  }
  if ((game==5)||(game==4)){
    const res3 = await Schedule.updateOne(
        { date, game:2, location, appointments: { $elemMatch: { reservationHour: hours, reservationMin:minutes } } },
        { $set: { 'appointments.$.status': color} }
      );
    console.log("block AmongUs ",res3);
    blocked.push("block AmongUs ");
  }
  if ((game==5)||(game==2)){
    const res4 = await Schedule.updateOne(
        { date, game:4, location, appointments: { $elemMatch: { reservationHour: hours, reservationMin:minutes } } },
        { $set: { 'appointments.$.status': color } }
      );
    console.log("block midi labirinth ",res4);
    blocked.push("block midi labirinth ");
  }   
  if((game==5)||(game==2)){
    const res5 = await Schedule.updateOne(
        { date, game:3, location, appointments: { $elemMatch: { reservationHour: hours, reservationMin:minutes } } },
        { $set: { 'appointments.$.status': color } }
      );
    console.log("block small labirinth ",res5);
    blocked.push("block small labirinth ");
  }        
  res.send({blocked});
  //Close DB connection
  await db.disconnect();
});
export default handler;