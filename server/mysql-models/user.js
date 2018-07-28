const db = require('../mysql/db.js')

module.exports = {
  login: (user) => {
    return new Promise((resolve, reject) => {
      db.connection.query('SELECT * FROM user WHERE username = ? AND password = ?', user, (err, data) => {
        if (err) reject(err)
        else resolve(data)
      })
    })
  },
  signup: (newUser) => {
    return new Promise((resolve, reject) => {
      db.connection.query('INSERT INTO user SET ?', newUser, (err, data) => {
        if (err) reject(err)
        else resolve(data)
      })
    })
  }
}