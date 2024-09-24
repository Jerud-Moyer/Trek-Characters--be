const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors({origin: '*'}));

app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use('/docs', require('./controllers/docs'));
app.use('/api/v1/characters', require('./controllers/characters'));


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
