import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const client = await mysql.createConnection(process.env.DATABASE_URL);

const DROP_ALBUMS_TABLE = `DROP TABLE IF EXISTS albums;`;
const CREATE_ALBUMS_TABLE = `CREATE TABLE albums (
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
  title VARCHAR(100),
  artiste_id INT,
  year INT UNSIGNED
);`;
const INSERT_ALBUMS = [
  `INSERT INTO albums (title, year, artiste_id) VALUES('Goodbye Yellow Brick Road', 2003, 1);`,
  `INSERT INTO albums (title, year, artiste_id) VALUES('Saturday Night Fever', 2010, 1);`,
  `INSERT INTO albums (title, year, artiste_id) VALUES('The Shape of Jazz to Come', 2007, 1);`,
  `INSERT INTO albums (title, year, artiste_id) VALUES('Bridge over Troubled Water', 2022, 1);`,
  `INSERT INTO albums (title, year, artiste_id) VALUES('Desolation Boulevard', 2016, 1);`,
];

const seedDB = async () => {
  try {
    await client.query(DROP_ALBUMS_TABLE);
    console.log("[INFO]: dropped albums table");

    await client.query(CREATE_ALBUMS_TABLE);
    console.log("[INFO]: created albums table");

    INSERT_ALBUMS.map(async (query) => {
      await client.query(query);
    });
    console.log("[INFO]: inserted albums");
  } catch (err) {
    console.error(err);
  }
};

console.log("seeding database...");

await seedDB();

await client.end();

process.exit(0);
