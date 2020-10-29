const pool = require('../utils/pool');

module.exports = class Character {
  id;
  name;
  affiliation;
  origin;
  race;
  image_url;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.affiliation = row.affiliation;
    this.origin = row.origin;
    this.race = row.race;
    this.imageUrl = row.image_url;
  }

  
};
