const express = require('express');
const { getAdvertisexBid, getAnotherBid, getAllBids } = require('../controllers/bidController');

const router = express.Router();

router.post('/getAdvertisexBid', getAdvertisexBid);
router.post('/getAnotherBid', getAnotherBid);
router.get('/bids', getAllBids);

module.exports = router;
