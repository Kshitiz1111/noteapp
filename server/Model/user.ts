import pool, { checkConnection } from "../Config/db";
import { userInfoType } from "../types/userType";

class User {
  userObj: userInfoType = {
    id: "",
    name: "",
    email: "",
  };

  constructor(obj: userInfoType) {
    console.log(obj);
    this.userObj.id = obj.id;
    this.userObj.name = obj.name;
    this.userObj.email = obj.email;
  }

  async register() {
    try {
      const checkDbConnection = await checkConnection();
      // console.log(checkConnection);
      const client = await pool.connect();
      if (checkDbConnection === 1) {
        // Check for table existence
        const tableExistsQuery = `SELECT EXISTS (
          SELECT FROM information_schema.tables
          WHERE table_schema = 'public'
          AND table_name = 'users'
        )`;

        const tableExistsResult = await client.query(tableExistsQuery);

        if (!tableExistsResult.rows[0].exists) {
          // Create users table
          const createTableQuery = `CREATE TABLE users (u_id VARCHAR(255) PRIMARY KEY, u_name VARCHAR(255) NOT NULL, u_email VARCHAR(255) NOT NULL)`;
          console.log("kdk model");
          const a = await client.query(createTableQuery);
        }

        // Insert data into users table
        const insertDataQuery = `insert into users(u_id, u_name, u_email) values('${this.userObj.id}', '${this.userObj.name}', '${this.userObj.email}')`;

        const insertDataResult = await client.query(insertDataQuery);
        console.log(insertDataResult);
        // client.release();
        return insertDataResult.rows[0]; // Inserted user data
      } else {
        console.log("database not found");
      }
    } catch (error) {
      console.error(error);
      throw error; // Rethrow error for handling
    }
  }

  async getAllUser() {
    try {
      const client = await pool.connect();

      // Check for table existence
      const tableExistsQuery = `SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'users'
      )`;

      const tableExistsResult = await client.query(tableExistsQuery);

      if (!tableExistsResult.rows[0].exists) {
        console.error('Table "users" does not exist.');
        return [];
      }

      // Fetch users
      const usersQuery = `SELECT * FROM users`;
      const usersResult = await client.query(usersQuery);

      // client.release();
      return usersResult.rows; // Array of user objects
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export default User;
