const express = require('express');
const router = express.Router();
const channel = require('../controllers/channels');
const notFound = require('../controllers/404');

//channel
router.get('/channels', channel.all);
router.get('/channels/:q', channel.all);
router.post('/addChannel', channel.create);
router.get('/channel/:slug', channel.get);
router.post('/channels/', channel.search);
router.post('/channels/slug', channel.slug);
router.put('/channel/:slug', channel.update);

router.get('*', notFound.show);

module.exports = router;