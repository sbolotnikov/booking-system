
import Template from '../../../models/template'
import nc from 'next-connect';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
const handler = nc({
    onError,
  });
handler.get(async (req, res) => {
        await db.connect();    

        const templates = await Template
        .find({}).sort({name:1}); 
        //Send success response
        res.status(201).json(templates);
        //Close DB connection
        await db.disconnect();             
    });
    export default handler;