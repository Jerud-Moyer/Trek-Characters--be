const pool = require('../utils/pool');

module.exports = class Character {
  id;
  name;
  affiliation;
  origin;
  race;
  imageUrl;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.affiliation = row.affiliation;
    this.origin = row.origin;
    this.race = row.race;
    this.imageUrl = row.image_url;
  }

  static async insert(character) {
    const { rows } = await pool.query(
      `INSERT into characters (name, affiliation, origin, race, image_url)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
      [character.name, character.affiliation, character.origin, character.race, character.imageUrl]
    );
    return new Character(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM characters',
    );

    return rows.map(row => new Character(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM recipes WHERE id=$1',
      [id]
    );
    if(!rows[0]) return null;
    else return new Character(rows[0]);
  }

  static async update(id, character) {
    const { rows } = await pool.query(
      `UPDATE characters
      SET name=$1,
          affiliation=$2,
          origin=$3,
          race=$4,
          image_url=$5
      WHERE id=$6
      RETURNING *
      `,
      [character.name, character.affiliation, character.origin, character.race, character.imageUrl, id]
    );
    return new Character(rows[0]);
  }
  
  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM characters WHERE id=$1 RETURNING *',
      [id]
    );
    return new Character(rows[0]);
  }
};
