import Users from '../../../models/userModel';
import nc from 'next-connect';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
const handler = nc({
    onError,
  });
handler.get(async (req, res) => {
        await db.connect();  
        const users = await Users
        .find().sort({status:1,name:1}); 
        //Send success response
        res.status(201).json(users);
        //Close DB connection
        await db.disconnect();             
    });
    export default handler;