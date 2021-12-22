
import Reservation from '../../../models/reservation'
import nc from 'next-connect';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
const handler = nc({
    onError,
  });
handler.post(async (req, res) => {
        const { location, game, dateStart, dateEnd } = req.body;
        await db.connect();    

        const reservationsRange = await Reservation
        .find({ location: location, game: game, reservationTime:{ $gt: new Date(dateStart), $lt: new Date(dateEnd)} }); 
        //Send success response
        res.status(201).json(reservationsRange);
        //Close DB connection
        await db.disconnect();             
    });
    export default handler;