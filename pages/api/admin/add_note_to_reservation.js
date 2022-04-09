
import Request from '../../../models/request';
import nc from 'next-connect';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
const handler = nc({
  onError,
});
handler.post(async (req, res) => {
  const { selectedId, addNote} = req.body;
  await db.connect();

  const request = await Request.updateOne(
    { _id: selectedId },
    {
      $push: { specialNote: addNote }
    } 
  );
  
  //Send success response
  res.status(201).json(request);
  //Close DB connection
  await db.disconnect();
});
export default handler;