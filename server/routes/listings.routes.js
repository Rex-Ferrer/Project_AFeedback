/* Dependencies */
var listings = require('../controllers/listing.server.controller.js'),
  users = require('../controllers/user.server.controller.js'),
  building = require('../controllers/building.server.controller.js'),

  classes = require('../controllers/class.server.controller.js'),
  express = require('express'),
  router = express.Router();

/*
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
 */
router.route('/listings')
  .get(listings.list)
  .post(listings.create);

router.route('/classes')
  .get(classes.list)
  .post(classes.create);

/*
  The ':' specifies a URL parameter.
 */
router.route('/listings/:listingId')
  .get(listings.read)
  .put(listings.update)
  .delete(listings.delete);



router.route('/listings/:listingEmail')
  .get(users.read);

router.param('listingEmail', listings.listingByEmail);
router.param('listingId', listings.listingByID);

/*
  The 'router.param' method allows us to specify middleware we would like to use to handle
  requests with a parameter.
  Say we make an example request to '/listings/566372f4d11de3498e2941c9'
  The request handler will first find the specific listing using this 'listingsById'
  middleware function by doing a lookup to ID '566372f4d11de3498e2941c9' in the Mongo database,
  and bind this listing to the request object.
  It will then pass control to the routing function specified above, where it will either
  get, update, or delete that specific listing (depending on the HTTP verb specified)
 */

router.route('/users/getCurrentUser')
  .get(users.currentUser);


router.route('/users')
  .get(users.list);

router.route('/users/:userId')
  .put(users.update);
router.param('userId', users.userByID);

router.route('/users/:userEmail')
  .get(users.read);
router.param('userEmail', users.UserByEmail);

router.route('/buildings')
  .get(building.AllBuildings);


router.route('/buildings/:buildingID')
  .get(building.read);

router.param('buildingID', building.buildingByID);



router.route('classes/:classID')
  .get(classes.read);

router.param('classID', classes.ClassByID);

module.exports = router;
