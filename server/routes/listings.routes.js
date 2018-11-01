var listings = require('../controllers/listings.server.controller.js'), 
    express = require('express'), 
    router = express.Router();


router.route('/')
.get(listings.list)
.post(listings.create);

