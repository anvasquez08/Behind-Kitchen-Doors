const SavedPlacesModel = require('../mysql-models/savedPlaces');

module.exports = {
  getPlaces: (req, res) => {
    SavedPlacesModel.retrieveByUserID(req.query.id)
      .then(response => res.send(response))
      .catch(err => res.send(err))
  }, 
  addPlace: (req, res) => {
    SavedPlacesModel.addByUserID(req.body)
      .then(response => res.send(response))
      .catch(err => res.send(err)) 
  }, 
  deletePlace: (req, res) => {
    SavedPlacesModel.deleteByDataID(req.query.id)
      .then(response => res.send(response))
      .catch(err => res.send(err))    
  }, 
}
