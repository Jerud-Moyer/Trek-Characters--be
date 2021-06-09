const { Router } = require('express');
const Character = require('../models/character');


module.exports = Router()

  .get('/', (req, res) => {
    Character
      .find()
      .then(characters => res.send(characters));
  })

  .get('/filter', (req, res) => {
    const  [entries] = Object.entries(req.query);
    Character
      .findByColumn(entries[0], entries[1])
      .then(characters => res.send(characters));
  })

  .get('/:id', (req, res) => {
    Character
      .findById(req.params.id)
      .then(character => res.send(character));
  })

  .get('/name/:name', (req, res) => {
    const searchName = req.params.name;
    Character
      .findByName(searchName)
      .then(character => res.send(character));
  })

  .post('/', (req, res) => {
    Character
      .insert(req.body)
      .then(newCharacter => res.send(newCharacter));
  })

  .put('/:id', (req, res) => {
    Character
      .update(req.params.id, req.body)
      .then(character => res.send(character));
  })

  .delete('/:id', (req, res) => {
    Character
      .delete(req.params.id)
      .then(character => res.send(character));
  });
