// import { getSession } from "next-auth/react";
import nc from 'next-connect';
import Reservation from '../../../models/reservation';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
    onError,
  });
handler.post(async (req, res) => {
  const { location, game, reservationTime } = req.body;
  await db.connect();
  const checkExisting = await Reservation.findOne({
    reservationTime: reservationTime,
    location: location,
    game: game,
  });
  if (checkExisting) {
    res.status(422).json({ message: 'record already exists' });
    await db.disconnect();
    return;
  }
  const newReservation = new Reservation(req.body);
  const status = await newReservation.save();
  //Send success response
  res.status(201).json({ message: 'User created', ...status });
  //Close DB connection
  await db.disconnect();
});
export default handler;
