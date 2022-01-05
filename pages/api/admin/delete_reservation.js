import Schedule from '../../../models/schedule';
import Request from '../../../models/request'
import nc from 'next-connect';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
const handler = nc({
    onError,
  });
handler.post(async (req, res) => {
    const { selectedId } = req.body;
        await db.connect();    
        const request = await Request
        .findOne({_id:selectedId}); 
        const request2 = await Schedule.updateOne(
            {date:request.date, location:request.location, game:request.game, appointments: { $elemMatch: { _id:request.schedule_id } } },
            { $set: { 'appointments.$.status': 'green' } }
          );      
          const request3 = await Request
          .remove({_id:selectedId},{justOne:true}); 
        res.status(201).json(request);
        //Close DB connection
        await db.disconnect();             
    });
    export default handler;