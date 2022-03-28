import Users from '../../../models/userModel';
import nc from 'next-connect';
import db from '../../../utils/db';
const mongoose = require('mongoose');
import { onError } from '../../../utils/error';
const handler = nc({
    onError,
  });
handler.post(async (req, res) => {
    const { id} = req.body;
        await db.connect(); 
        const user = await Users
        .findOne({_id:mongoose.Types.ObjectId(id)}); 
        //Send success response
        res.status(201).json(user);
        //Close DB connection
        await db.disconnect();             
    });
    export default handler;