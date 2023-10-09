import {Router} from 'express'
import {MongoClient} from "mongodb";

const router = Router();

router
    .route('/:code')
    .get(async(req, res) => {
        const code = req.params.code;
        const client = await MongoClient.connect(process.env.MONGODB_URL + '/jjodel');
        const db = client.db('rooms');
        const collection = await db.collection(code);
        const actions = await collection.find().toArray();
        actions.sort((a, b) => a.timestamp - b.timestamp);
        res.status(200).send(actions);
    })

export {router as RoomRouter};

