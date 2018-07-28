const AppRouter = require('express').Router();

const searchController = require('./controllers/search.js');
const userController   = require('./controllers/user.js')
const placesController = require('./controllers/savedPlaces.js')

/* SEARCH ROUTES */ 
// Used in the Search Bar Address Component to fetch the results of the client's address and zip code
AppRouter.route('/searchRestaurants')
  .post(searchController.searchRestaurants)

// Used in the Search Bar Business Name Component (AUTOCOMPLETE) to fetch live search results 
AppRouter.route('/searchRestaurant')
  .post(searchController.searchRestaurant)

// Used in the Search Bar Business Name Component (AUTOCOMPLETE) to actually search Yelp for the name 
AppRouter.route('/searchRestaurantName')
  .post(searchController.searchRestaurantName)

// Used in App Component to fetch details for the profile component 
AppRouter.route('/searchRestaurantName')
  .get(searchController.searchRestaurantId)

/* USER ROUTES */
AppRouter.route('/user-login')
  .post(userController.login)

AppRouter.route('/user-signup')
  .post(userController.signup)

/* SAVED PLACES ROUTES */
AppRouter.route('/places')
  .get(placesController.getPlaces)
  .post(placesController.addPlace)
  .delete(placesController.deletePlace)

module.exports = AppRouter;
