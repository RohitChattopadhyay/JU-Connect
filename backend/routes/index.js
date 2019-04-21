const express = require('express');
const router = express.Router();
const channel = require('../controllers/channels');
const subscribers = require('../controllers/subscribers');
const auth = require('../controllers/authorization');
const notFound = require('../controllers/404');

//channel
router.get('/channels', channel.all);
router.get('/channels/:q', channel.all);
router.post('/addChannel', channel.create);
router.get('/channel/:slug', channel.get);
router.post('/channels', channel.search);
router.post('/channels/slug', channel.slug);
router.put('/channel/:slug', channel.update);

router.post('/auth/signup',auth.signup)
router.post('/auth/login',auth.login)

//subscribers
// router.get('/subscribers/channels', subscribers.allChannels);
// router.post('/subscribers/device', subscribers.addDevice);
// router.post('/subscribers/channels', subscribers.addChannels);

router.get('*', notFound.show);

module.exports = router;