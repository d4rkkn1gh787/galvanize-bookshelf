'use strict';
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
var port = process.env.PORT || 3000;
var environment = process.env.NODE_ENV || 'development';
var config = require('../knexfile');
var knex = require('knex')(config[environment]);
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));
var humps = require('humps');

router.get('/books', function(req, res) {
    knex('books').orderBy('title', 'asc').then(function(books) {
        res.send(humps.camelizeKeys(books));
    })
});

router.get('/books/:id', function(req, res) {
    var bookID = req.params.id;
    knex('books').where({
        id: bookID
    }).first().then(function(books) {
        res.send(humps.camelizeKeys(books))
    })
});

// router.post('/books', function(req, res) {
//     knex('books').insert({
//         title: req.body.title,
//         author: req.body.author,
//         genre: req.body.genre,
//         description: req.body.description,
//         cover_url: req.body.cover_url,
//     }).then(function(books) {
//         res.send()
//     })
// })



module.exports = router;
