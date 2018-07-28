const express    = require('express');
const bodyParser = require('body-parser');
const logger     = require('morgan');
const app        = express();
const router     = require('./server/routes.js');

const db = require('./server/mysql/db.js')

app.use(express.static(__dirname + '/client/dist'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use('/',router);

app.listen(80, () => console.log('Listening to port 80')); 
module.exports.app = app;

