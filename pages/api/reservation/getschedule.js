import Schedule from '../../../models/schedule';
// require('../../../models/template');
import nc from 'next-connect';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
const handler = nc({
  onError,
});
handler.post(async (req, res) => {
  const { location, game, dt1, dt2 } = req.body;
  // const { location, game, dateStart, dateEnd } = req.body;
  await db.connect();

  const results = await Schedule.find({
    location: location,
    game: game,
    date: {
      $gte: dt1,
      $lte: dt2
    }
  }).sort({date:1})
  res.status(201).json(results);

  //Close DB connection
  await db.disconnect();
});
export default handler;
