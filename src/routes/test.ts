import {Router} from 'express'

const router = Router();

router
    .route('')
    .get((req, res) => {
        res.status(200).send('GET');
    })
    .post((req, res) => {
        res.status(200).send('POST');
    })
    .put((req, res) => {
        res.status(200).send('PUT');
    })
    .delete((req, res) => {
        res.status(200).send('DELETE');
    })

export {router as TestRouter};

