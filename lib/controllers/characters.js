const { Router } = require('express');
const paginatedResults = require('../utils/paginatedResults');
const Character = require('../models/character');
const jpgDelete = require('../middleware/jpg-delete');
const ImageService = require('../services/image-service');


module.exports = Router()

  .get('/', (req, res) => {
    Character
      .find()
      .then(characters => res.send(characters));
  })

  .get('/paginated', (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    Character
      .find()
      .then(characters => paginatedResults(characters, page, limit))
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

  .put('/:secretWord/:id/:oldImageKey', jpgDelete, (req, res) => {
    if(req.params.secretWord === process.env.SECRET_WORD) {
      const { imageUrl, name } = req.body;
      if(req.s3Response) {
        ImageService.uploadImage(imageUrl, name)
          .then(newUrl => {
            Character.update(req.params.id, {
              ...req.body,
              imageUrl: newUrl
            })
              .then(updatedCharacter => res.send(updatedCharacter));
          });
      } else {
        Character
          .update(req.params.id, req.body)
          .then(character => res.send(character));
      }
    } else {
      throw new Error('ERROR - I am Nomad');
    }

  })

  .delete('/secretWord/:id', (req, res) => {
    if(req.params.secretWord === process.env.SECRET_WORD) {
      Character
        .delete(req.params.id)
        .then(character => res.send(character));
    } else {
      throw new Error('ERROR - You are imperfect, I am Nomad');
    }
  });
