import {Router} from 'express'
import {MongoClient} from "mongodb";

const router = Router();

router
    .route('/:code')
    .get(async(req, res) => {
        const code = req.params.code;
        const client = await MongoClient.connect(process.env.MONGODB_URL + '/jjodel')
        const db = client.db('rooms');
        const collection = await db.collection(code);
        res.status(200).send(await collection.find().toArray());
    })

export {router as RoomRouter};

