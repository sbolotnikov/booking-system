// import { getSession } from "next-auth/react";
import { MongoClient } from 'mongodb';
export default async (req, res) => {
    if (req.method === 'POST') {
        const { location, game, reservationTime } = req.body;
        const client = await MongoClient.connect(
            process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }
        );
        const db = client.db();
        const checkExisting = await db
        .collection('reservations')
        .findOne({ reservationTime: reservationTime, location: location, game: game}); 
        if (checkExisting) {
            res.status(422).json({ message: 'record already exists' });
            client.close();
            return;
        }
        //Hash password
        const status = await db.collection('reservations').insertOne(req.body);
        //Send success response
        res.status(201).json({ message: 'User created', ...status });
        //Close DB connection
        client.close();             
    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
};