
import Request from '../../../models/request'
import nc from 'next-connect';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
const handler = nc({
    onError,
  });
handler.post(async (req, res) => {
        await db.connect();  
        const requests = await Request
        .find({ location:req.body.location}).sort({date:1,reservationHour:1,reservationMin:1}); 
        //Send success response
        res.status(201).json(requests);
        //Close DB connection
        await db.disconnect();             
    });
    export default handler;