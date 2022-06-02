import client from "../../lib/db";

export const handler = async function (event, ctx) {
  const [rows] = await client.promise().query(`select * from albums;`);

  return {
    statusCode: 200,
    body: JSON.stringify({ data: rows }),
  };
};
