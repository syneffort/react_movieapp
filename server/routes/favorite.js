const express = require('express');
const Favorite = require('../models/Favorite');

const router = express.Router();

router.post('/favorite-number', (req, res) => {
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

router.post('/add-favorite', (req, res) => {
    const favortie = new Favorite(req.body);
    favortie.save((err, doc) => {
        if (err) return res.status(400).send(err);
        
        return res.status(200).json({ success: true, doc });
    });
});

router.post('/remove-favorite', (req, res) => {
    let { movieId, userFrom } = req.body;
    Favorite.findOneAndDelete({ 'movieId': movieId, 'userFrom': userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).send(err);
        
            return res.status(200).json({ success: true, doc });
        });
});

router.post('/get-favorite-movie', (req, res) => {
    Favorite.find({'userFrom': req.body.userFrom})
        .exec((err, doc) => {
            if (err) return res.status(400).send(err);
            
            return res.status(200).json({ success: true, favorites: doc});
        })
});

module.exports = router;