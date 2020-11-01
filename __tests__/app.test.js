const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Character = require('../lib/models/character');

describe('Trek-Characters-be routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates a character', () => {
    return request(app)
      .post('/api/v1/characters')
      .send({
        name: 'TrakMash',
        affiliation: 'Klingon SpaceForce',
        origin: 'Kronos',
        race: 'Klingon',
        imageUrl: 'klingHub.com'
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: 'TrakMash',
          affiliation: 'Klingon SpaceForce',
          origin: 'Kronos',
          race: 'Klingon',
          imageUrl: 'klingHub.com'
        });
      });
  });

  it('gets all characters', async() => {
    const characters = await Promise.all([
      {
        name: 'TrakMash',
        affiliation: 'Klingon SpaceForce',
        origin: 'Kronos',
        race: 'Klingon',
        imageUrl: 'klingHub.com'
      },
      {
        name: 'Atreyaaaah',
        affiliation: 'Green Machine',
        origin: 'Blechmar',
        race: 'Green Lady',
        imageUrl: 'GreenLadyHub.com'
      },
      {
        name: 'Bertram',
        affiliation: 'Starfleet',
        origin: 'Earth',
        race: 'Human',
        imageUrl: 'starpix.com'
      }
    ].map(character => Character.insert(character)));

    return request(app)
      .get('/api/v1/characters')
      .then(res => {
        characters.forEach(character => {
          expect(res.body).toContainEqual(character);
        });
      });

  });

  it('updates a recipe by id', async() => {
    const character = await Character.insert({
      name: 'Johnson',
      affiliation: 'Starfleet',
      origin: 'Earth',
      race: 'Human',
      imageUrl: 'starpix.com'
    });

    return request(app)
      .put(`/api/v1/characters/${character.id}`)
      .send({
        name: 'Commander Johnson',
        affiliation: 'Starflute',
        origin: 'Earth',
        race: 'Human',
        imageUrl: 'starpix.com'
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: 'Commander Johnson',
          affiliation: 'Starflute',
          origin: 'Earth',
          race: 'Human',
          imageUrl: 'starpix.com'
        });
      });
  });
});
