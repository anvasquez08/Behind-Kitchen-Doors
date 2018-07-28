const axios = require('axios');
const { Headers } = require('../../config/config.js')

const helpers = {
  getHeathRating: (singlePlaceObj) => {
    let name = singlePlaceObj.name.toUpperCase();
    return axios.get(`https://data.cityofnewyork.us/resource/9w7m-hzhe.json?$where=dba="${name}"`)
        .then(response => {
          if (response.data.length > 0) {
            singlePlaceObj['healthRating'] = response.data
            return singlePlaceObj
          } else {
            singlePlaceObj['healthRating'] = []
            return singlePlaceObj
          }  
      })
    .catch(err => console.log('inner error', err))
  }, 

  fetchBusinessDetails: (id) => {
    return axios.get(`https://api.yelp.com/v3/businesses/${id}`, Headers)
      .then(response => {return response.data})
      .catch(err => console.log('yelp business api error', err))
  },

  fetchReviews:(id, responseBody) => {
    return axios.get(`https://api.yelp.com/v3/businesses/${id}/reviews`, Headers)
    .then(response => { 
       responseBody['reviews'] = response.data
      return responseBody
    })
    .catch(err => console.log('yelp review api error', err))
  }, 

  fetchBusinessesByName: (name, address) => {
    return axios.get(`https://api.yelp.com/v3/businesses/search?term="${name}"&location="${address}"`, Headers)
    .then(response => {return response.data.businesses})
    .catch(err => console.log(err))
  }, 

  formatIntoArray: (result) => {
    let newObj = {}
        result.forEach(year => {
      
      for (let key in year) {
          if (!newObj[key]) {
             newObj[key] = [];
          }         
          for (let k in year[key]) {
              newObj[key].push(year[key][k])
            }
          }
      }) 
    return newObj;
  },
  
  formatHealthData: (results) => {
    let data = {} 
    results.forEach((healthRating) => {
        let year = healthRating.inspection_date.split('').slice(0, 4).join('')
        let date = healthRating.inspection_date.split('').slice(0, 10).join('')

        let violations = {}
        violations.violation_code = healthRating.violation_code
        violations.violation_description = healthRating.violation_description
        
        if(!data[year]) {
            data[year] = {}
        } 

        if (!data[year][date]) {
            data[year][date] = {}
            const key = data[year][date]
            if (healthRating.grade === undefined)  healthRating.grade = 'No Score'
            key.inspection_date = date
            key.healthRating = [healthRating.grade] 
            key.score = [healthRating.score] 
            key.violations = [violations]
        } else if (data[year][date]) {
            const healthRating = data[year][date].healthRating
            const score = data[year][date].score
            const violationsArr = data[year][date].violations
              
            if (healthRating.indexOf(healthRating.grade) === -1 && healthRating.grade !== undefined) {
                healthRating.push(healthRating.grade)
            } else if (score.indexOf(healthRating.score) === -1 && healthRating.grade !== undefined) {
                score.push(healthRating.score)
            } 
            violationsArr.push(violations)
          }
      })

    const finalData = helpers.formatIntoArray([data])
     return [finalData]
  }
}

module.exports = helpers