const db = require('../mysql/db.js')

module.exports = {
  retrieveByUserID: (userId) => {
    return new Promise((resolve, reject) => {
      db.connection.query('SELECT * FROM savedPlaces WHERE userID = ?', userId, (err, data) => {
        if (err) reject(err)
        else resolve(data)
      })
    })
  }, 
  addByUserID: (dataSet) => {
    return new Promise((resolve, reject) => {
      db.connection.query('INSERT INTO savedPlaces SET ?', dataSet, (err, data) => {
        if (err) reject(err)
        else resolve(data)
      })
    })
  }, 
  deleteByDataID: (dataId) => {
    return new Promise((resolve, reject) => {
      db.connection.query('DELETE FROM savedPlaces WHERE id = ?', dataId, (err, data) => {
        if (err) reject(err)
        else resolve(data)
      })
    })
  }, 
}