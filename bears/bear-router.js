const knex = require('knex');

const router = require('express').Router();

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/lambda.db3'
    },
    useNullAsDefault: true,
};

const db = knex(knexConfig);

router.post('/', (req, res) => {
    if (req.body.name) {
        db('bears')
            .insert(req.body, 'id')
            .then(ids => {
                res.status(201).json(ids)
            })
            .catch(error => {
                res.status(500).json({ error: 'Could not add bear' })
            })
    } else {
        res.status(400).json({ error: 'Must include name' })
    }
})


module.exports = router;