const express = require('express');
const Character = require('./models/character');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.post('/api/v1/characters', (req, res) => {
  Character
    .insert(req.body)
    .then(newCharacter => res.send(newCharacter));
});

app.get('/api/v1/characters', (req, res) => {
  Character
    .find()
    .then(characters => res.send(characters));
});

app.get('/api/v1/characters/:id', (req, res) => {
  Character
    .findById(req.params.id)
    .then(character => res.send(character));
});



app.put('/api/v1/characters/:id', (req, res) => {
  Character
    .update(req.params.id, req.body)
    .then(character => res.send(character));
});

app.delete('/api/v1/characters/:id', (req, res) => {
  Character
    .delete(req.params.id)
    .then(character => res.send(character));
});

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
