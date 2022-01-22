import Users from '../../../models/userModel';
import nc from 'next-connect';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
const handler = nc({
    onError,
  });
handler.put(async (req, res) => {
    const { selectedId, status } = req.body;
        await db.connect();   

        const request = await Users
        .updateOne({_id:selectedId},{ $set: { status: status} }); 
        //Send success response
        res.status(201).json(request);
        //Close DB connection
        await db.disconnect();             
    });
    export default handler;