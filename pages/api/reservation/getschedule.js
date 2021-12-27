
import Schedule from '../../../models/schedule'
import nc from 'next-connect';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
const handler = nc({
    onError,
  });
handler.post(async (req, res) => {
        const { location, game } = req.body;
        // const { location, game, dateStart, dateEnd } = req.body;
        await db.connect();    

        const reservationsRange = await Schedule
        .find({ location: location, game: game }).populate("template_id").then(function (results) {
            // .find({ location: location, game: game, reservationTime:{ $gt: dateStart, $lt: dateEnd} }).populate("template_id").then(function (results) {
            // results are available to us inside the .then
            res.status(201).json(results);
          }).catch(function (err) {
            res.send(err);
          })
        //Close DB connection
        await db.disconnect();             
    });
    export default handler;