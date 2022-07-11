import { getConnection } from "../../lib/db";

export const handler = async function (event, ctx) {
   const client = await getConnection();
   const [rows] = await client.query(`select * from albums;`);

   return {
      statusCode: 200,
      body: JSON.stringify({ data: rows }),
   };
};
