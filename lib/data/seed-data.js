const Character = require ('../models/character');
const characterData = require ('./characters');
const pool = require('../utils/pool');
const fs = require('fs');

pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
Promise.all(

  characterData.map(character => {
    return Character.insert(character);

  }),
);
