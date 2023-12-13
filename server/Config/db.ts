import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const pool: Pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

const checkConnection = async () => {
  try {
    const client = await pool.connect();
    await client.query("SELECT 1"); // Simple query to check connection
    client.release();
    console.log("Database is connected");
    return 1;
  } catch (error) {
    console.error(error);
    console.error("Database connection failed");
    return 0;
  }
};

export default pool;
export { checkConnection };
