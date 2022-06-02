import client from "../../lib/db";

export const handler = async function ({ body }, ctx) {
  const album = JSON.parse(body);

  const [result] = await client
    .promise()
    .query(`INSERT INTO albums (title, year, artiste_id) VALUES (?, ?, ?);`, [
      album?.title,
      album?.year,
      1,
    ]);

  const [rows] = await client
    .promise()
    .query(`SELECT * FROM albums where id = ?`, [result.insertId]);

  return {
    statusCode: 200,
    body: JSON.stringify({ data: rows[0] }),
  };
};
