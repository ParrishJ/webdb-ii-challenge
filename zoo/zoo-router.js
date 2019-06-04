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
        db('zoos')
            .insert(req.body, 'id')
            .then(ids => {
                res.status(201).json(ids)
            })
            .catch(error => {
                res.status(500).json({ error: 'Could not add zoo' })
            })
    } else {
        res.status(400).json({ error: 'Must include name' })
    }
})

router.get('/', (req, res) => {
    db('zoos')
        .then(zoos => {
            res.status(200).json(zoos)
        })
        .catch(error => {
            res.status(500).json({ error: "Could not retrieve zoos" })
        });
});

router.get('/:id', (req, res) => {
    db('zoos')
        .where({ id: req.params.id })
        .first()
        .then(zoo => {
            if (zoo) {
                res.status(200).json(zoo)
            } else {
                res.status(404).json({ error: "No Record for This Zoo" })
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
});

router.put('/:id', (req, res) => {
    const changes = req.body
    db('zoos')
        .where({ id: req.params.id })
        .update(changes)
        .then(count => {
            if (count > 0) {
                res.status(200).json(count)
            } else {
                res.status(404).json({ message: 'Zoo not fount' })
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.delete('/:id', (req, res) => {
    db('zoos')
        .where({ id: req.params.id })
        .del()
        .then(count => {
            if (count > 0) {
                const unit = count > 1 ? 'zoos' : 'zoo'
                res.status(200).json({ message: `${count} ${unit} deleted` })
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});


module.exports = router;