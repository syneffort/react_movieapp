const express = require('express');
const Favorite = require('../models/Favorite');

const router = express.Router();

router.post('/favoritenumber', (req, res) => {
    let movieId = req.body.movieId

    Favorite.find({'movieId': movieId})
        .exec((err, info) => {
            if (err) return res.status(400).send(err);

            res.status(200).json({ success: true, favoriteNumber: info.length });
        });

    
})

module.exports = router;