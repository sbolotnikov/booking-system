
import { MongoClient } from 'mongodb';
export default async (req, res) => {
    if (req.method === 'GET') {
        const { location, game, dateStart, dateEnd } = req.body;
        const client = await MongoClient.connect(
            process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }
        );
        const db = client.db();
        const reservationsRange = await db
        .collection('reservations')
        .find({ location: location, game: game, reservationTime:{ $gt: dateStart, $lt: dateEnd }}); 
        if (reservationsRange) {
            res.status(422).json(["empty"]);
            client.close();
            return;
        }

        //Send success response
        res.status(201).json(reservationsRange);
        //Close DB connection
        client.close();             
    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
};