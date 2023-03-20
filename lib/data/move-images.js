const Character = require('../models/character');
const ImageService = require('../services/image-service');

Character.find()
  .then(characters => {
    characters.map(character => {
      console.log('hello? => ', character);
      ImageService.uploadImage(character.imageUrl, character.name)
        .then(newImageUrl => {
          Character.update(character.id, {
            ...character,
            imageUrl: newImageUrl
          });
        });
    });
  });
