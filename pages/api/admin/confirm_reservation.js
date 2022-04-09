import Schedule from '../../../models/schedule';
import Request from '../../../models/request'
import nc from 'next-connect';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
const handler = nc({
    onError,
  });
handler.put(async (req, res) => {
    const { selectedId, changeRecord } = req.body;
        await db.connect();   
        const request = await Request.findOne({_id:selectedId}); 
        const request2 = await Schedule.updateOne(
          {date:request.date, location:request.location, game:request.game, appointments: { $elemMatch: { _id:request.schedule_id } } },
          { $set: { 'appointments.$.status': 'pink' } }
        );  
        const request3 = await Request
        .updateOne({_id:selectedId},{ $set: { reservationConfirmDate: Date.now() }, 
        $push: { changesToRequest: changeRecord } }); 
        //Send success response
        res.status(201).json(request);
        //Close DB connection
        await db.disconnect();             
    });
    export default handler;