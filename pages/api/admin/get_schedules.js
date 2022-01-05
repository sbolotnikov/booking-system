
import Schedule from '../../../models/schedule'
import nc from 'next-connect';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
const handler = nc({
    onError,
  });
handler.post(async (req, res) => {
        await db.connect();   
        const schedules = await Schedule
        .find({game:req.body.game, location:req.body.location}); 
        //Send success response
        res.status(201).json(schedules);
        //Close DB connection
        await db.disconnect();             
    });
    export default handler;