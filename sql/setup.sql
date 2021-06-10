DROP TABLE IF EXISTS characters;

CREATE TABLE characters (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  affiliation TEXT,
  origin TEXT,
  race TEXT,
  image_url TEXT
);
