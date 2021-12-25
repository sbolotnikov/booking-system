// import { getSession } from "next-auth/react";
import nc from 'next-connect';
import Template from '../../../models/template';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
    onError,
  });
handler.post(async (req, res) => {
  const { name, appointments} = req.body;
  await db.connect();
  const checkExisting = await Template.findOne({
    name: name,
  });
  console.log(checkExisting)
  if (checkExisting) {
    const rec = await Template.updateOne(
      {name: name },
      { $set: { name, appointments} })
      console.log(rec)
    res.status(201).json({ message: 'record updated' });
    await db.disconnect();
    return;
    
  }
  const newTemplate = new Template(req.body);
  const status = await newTemplate.save();
  //Send success response
  res.status(201).json({ message: 'User created', ...status });
  //Close DB connection
  await db.disconnect();
});
export default handler;