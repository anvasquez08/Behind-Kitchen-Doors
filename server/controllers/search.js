const axios = require('axios');
const connection = require('../mysql/db.js')
const {Google_API, Headers} = require('../../config/config.js')
const {fetchBusinessesByName, getHeathRating, fetchBusinessDetails, fetchReviews, formatHealthData } = require('./helpers.js')

const googleMapsClient = require('@google/maps').createClient({
  key: Google_API,
  Promise: Promise
});

module.exports = {
  searchRestaurants: (req, res) => {
    let lat, lng, fullAddress

    //1) First get the latitude and longitude of the address using Google API.
    let address = `address=${req.body.address.split(' ').join('+')}+${req.body.zipcode}`;
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?${address}&key=${Google_API}`)
      .then(googleResponse => {
        lat = googleResponse.data.results[0].geometry.location.lat;
        lng = googleResponse.data.results[0].geometry.location.lng;
        fullAddress = googleResponse.data.results[0].formatted_address;


        //2) Then, fetch restaurants with Yelp's API.
        return axios.get(`https://api.yelp.com/v3/businesses/search?term="food"&latitude=${lat}&longitude=${lng}&open_now=${true}&limit=${10}`, Headers)
        .then(yelpResponse => { 


        //3) Finally, fetch health grading information per restaurant. 
        return Promise.all( yelpResponse.data.businesses.map(getHeathRating) )
          .then(collData => {
            let filteredData = collData.filter(obj => obj !== undefined)
            res.send(filteredData)
          })
          .catch((err) => res.sendStatus(500))
          })
        .catch((err) => res.sendStatus(500))
      })
    .catch((err) => res.sendStatus(500))
  }, 

    searchRestaurants: (req, res) => {
    let lat, lng, fullAddress

    //1) First get the latitude and longitude of the address using Google API.
    let address = `address=${req.body.address.split(' ').join('+')}+${req.body.zipcode}`;
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?${address}&key=${Google_API}`)
      .then(googleResponse => {
        lat = googleResponse.data.results[0].geometry.location.lat;
        lng = googleResponse.data.results[0].geometry.location.lng;
        fullAddress = googleResponse.data.results[0].formatted_address;


        //2) Then, fetch restaurants with Yelp's API.
        return axios.get(`https://api.yelp.com/v3/businesses/search?term="food"&latitude=${lat}&longitude=${lng}&open_now=${true}&limit=${10}`, Headers)
        .then(yelpResponse => { 


        //3) Finally, fetch health grading information per restaurant. 
        return Promise.all( yelpResponse.data.businesses.map(getHeathRating) )
          .then(collData => {
            let filteredData = collData.filter(obj => obj !== undefined)
            res.send(filteredData)
          })
          .catch((err) => res.sendStatus(500))
          })
        .catch((err) => res.sendStatus(500))
      })
    .catch((err) => res.sendStatus(500))
  }, 

  searchRestaurant: (req, res) => {
      const {input} = req.body
      googleMapsClient.placesAutoComplete({
        input: input,
        language: 'en',
        radius: 10,
        components: {country: 'us'}
      })
      .asPromise()
      .then(response => {
        res.send(response.json.predictions)
      }) 
      .catch(err => res.send(err))
  },

  searchRestaurantName: (req, res) => {
      const {term} = req.body;
      const name = term.split(',')[0]
      const address = term.split(',').slice(1).join(',').trim()
      fetchBusinessesByName(name, address)
      .then(response => Promise.all(response.map(getHeathRating)))
      .then(response => {
          response = response.filter(obj => obj !== undefined)
          res.send(response)
        })
      .catch(err => console.log(err))
  },

  searchRestaurantId: (req, res) => {
      let {id} = req.query
      fetchBusinessDetails(req.query.id)
      .then(response => fetchReviews(id, response))
      .then(response => getHeathRating(response))
      .then(response => {
        response.healthRating = formatHealthData(response.healthRating)
        res.send(response)
      })
      .catch(err => console.log(err))
  }
}

 