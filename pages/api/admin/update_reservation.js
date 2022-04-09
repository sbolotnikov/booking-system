import Schedule from '../../../models/schedule';
import Request from '../../../models/request';
import nc from 'next-connect';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
const handler = nc({
  onError,
});
handler.put(async (req, res) => {
  const { selectedId, changeRecord, reservePaste} = req.body;
  await db.connect();
  const request = await Request.findOne({_id:selectedId});
  // const request2 = await Schedule.updateOne(
  //   {date:request.date, location:request.location, game:request.game, appointments: { $elemMatch: { _id:request.schedule_id } } },
  //   { $set: { 'appointments.$.status': 'red' } }
  // );
  const request1 = await Request.updateOne(
    { _id: selectedId },
    {$set: {
        game: reservePaste.game,
        date: reservePaste.date,
        reservationHour: reservePaste.reservationHour,
        reservationMin: reservePaste.reservationMin,
        schedule_id: reservePaste._id,
        reservationConfirmDate: null,
      } ,
      $push: { changesToRequest: changeRecord }
    } 
  );
  
  const rSch = await Schedule.updateOne(
    { date: reservePaste.date, game: reservePaste.game, location:reservePaste.location, appointments: { $elemMatch: { _id: reservePaste._id } } },
    { $set: { 'appointments.$.status': 'orange' } }
  );
  const rSch1 = await Schedule.updateOne(
    { date: request.date, game: request.game, location:request.location, appointments: { $elemMatch: { _id: request.schedule_id } } },
    { $set: { 'appointments.$.status': 'green' } }
  );
  //Send success response
  res.status(201).json(request);
  //Close DB connection
  await db.disconnect();
});
export default handler;
