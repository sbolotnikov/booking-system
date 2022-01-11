// import { getSession } from "next-auth/react";
import nc from 'next-connect';
import Users from '../../models/userModel';
import bcrypt from 'bcryptjs';
import db from '../../utils/db';
import { onError } from '../../utils/error';
const mongoose = require('mongoose');
const handler = nc({
  onError,
});
handler.post(async (req, res) => {
  const { name, id, email, phone, image, password } = req.body;
  await db.connect();
  console.log("inside ")
  const resUser = await Users.findOne({
    _id: mongoose.Types.ObjectId(id),
  });
  console.log("record:",resUser);
  let objSet={}
  if (resUser.name!==name) objSet = Object.assign(objSet,{name});
  if ((resUser.phone!==phone)||((typeof  resUser.phone=== 'undefined')&&(phone!==""))) objSet = Object.assign(objSet,{phone});
  if (resUser.email!==email) objSet = Object.assign(objSet,{email}); 
  if (resUser.image!==image) objSet = Object.assign(objSet,{image});
  const hashPass = await bcrypt.hash(password, 12);
  if (password.length>5) objSet = Object.assign(objSet,{password:hashPass}) 
  console.log("object", objSet)

  const rSch = await Users.updateOne(
    { _id: mongoose.Types.ObjectId(id),},
    { $set: objSet }
  );
  res.send(rSch);
  //Close DB connection
  await db.disconnect();
});
export default handler;