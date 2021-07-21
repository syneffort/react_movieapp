const express = require('express');
const Favorite = require('../models/Favorite');

const router = express.Router();

router.post('/favoritenumber', (req, res) => {
    let { movieId } = req.body;

    Favorite.find({'movieId': movieId})
        .exec((err, info) => {
            if (err) return res.status(400).send(err);

            res.status(200).json({ success: true, favoriteNumber: info.length });
        });
});

router.post('/favorited', (req, res) => {
    let { movieId, userFrom } = req.body;

    Favorite.find({'movieId': movieId, 'userFrom': userFrom })
        .exec((err, info) => {
            if (err) return res.status(400).send(err);

            let result = info.length !== 0 ? true : false;

            res.status(200).json({ success: true, favorited: result });
        });
});

module.exports = router;