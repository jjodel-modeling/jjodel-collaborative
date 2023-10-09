import {Router} from 'express'
import {MongoClient} from "mongodb";
import U from "../common/U";

const router = Router();

router
    .route('/:code')
    .get(async(req, res) => {
        const code = req.params.code;
        const client = await MongoClient.connect(process.env.MONGODB_URL + '/jjodel');

        const permissions = client.db('permissions');
        const check = await permissions.listCollections({name: code}).toArray();
        if(!check.length) return res.status(401).send();

        const rooms = client.db('rooms');
        const room = await rooms.collection(code);
        const actions = await room.find().toArray();
        actions.sort((a, b) => a.timestamp - b.timestamp);
        return res.status(200).send(actions);
    })

router
    .route('/')
    .post(async(req, res) => {
        const client = await MongoClient.connect(process.env.MONGODB_URL + '/jjodel');
        const permissions = client.db('permissions');
        const code = U.getRandomString(10);
        const permission = await permissions.collection(code);
        await permission.insertOne({user: 'Todo User Reference'});
        return res.status(200).send(code);
    })

export {router as RoomRouter};

