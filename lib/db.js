import { createConnection } from "mysql2/promise";

export async function getConnection() {
   try {
      const connection = await createConnection(process.env.DATABASE_URL);

      return connection;
   } catch (error) {
      console.error("[MySQL]: unable to connect to database - %s", error);
   }
}
