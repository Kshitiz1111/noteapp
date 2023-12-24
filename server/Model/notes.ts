import { response } from "express";
import pool, { checkConnection } from "../Config/db";
import { NotesType } from "../types/noteType";
import { json } from "body-parser";

class Notes {
  noteObj: NotesType = {
    user: "",
    note: "",
  };

  constructor(obj: NotesType) {
    // console.log(`form model: ${JSON.stringify(obj)}`);
    this.noteObj.user = obj.user;

    this.noteObj.note = JSON.stringify(obj.note);
  }

  async save() {
    try {
      const checkDbConnection = await checkConnection();
      // console.log(checkConnection);
      const client = await pool.connect();
      if (checkDbConnection === 1) {
        // Check for table existence
        const tableExistsQuery = `SELECT EXISTS (
          SELECT FROM information_schema.tables
          WHERE table_schema = 'public'
          AND table_name = 'notes'
        )`;

        const tableExistsResult = await client.query(tableExistsQuery);

        if (!tableExistsResult.rows[0].exists) {
          // Create users table
          const createTableQuery = `CREATE TABLE notes (u_name VARCHAR(255) UNIQUE, u_notes json)`;
          await client.query(createTableQuery);
        }

        const insertQuery = `INSERT INTO notes ("u_name")
        SELECT '${this.noteObj.user}'
        WHERE NOT EXISTS (
          SELECT 1 FROM notes WHERE u_name = '${this.noteObj.user}'
        )`;
        await client.query(insertQuery);

        //check if name exist
        let result;
        const checkNameQuery = `SELECT u_name FROM notes WHERE u_name = '${this.noteObj.user}'`;
        let nameExist = await client.query(checkNameQuery);

        if (!nameExist) {
          const insertDataQuery = `INSERT INTO notes ("u_notes")
          SELECT '${this.noteObj.note}'
          WHERE EXISTS (SELECT 1 FROM notes WHERE u_name = '${this.noteObj.user}');`;

          result = await client.query(insertDataQuery);
          console.log("newINsert");
        } else {
          const updateDateQuery = `UPDATE notes
          SET u_notes = '${this.noteObj.note}'
          WHERE u_name = '${this.noteObj.user}' RETURNING *;`;

          result = await client.query(updateDateQuery);
        }
        // console.log(JSON.stringify(result.rows[0]));
        client.release();
        return result.rows[0];
      } else {
        console.log("database not found");
      }
    } catch (error) {
      console.error(error);
      throw error; // Rethrow error for handling
    }
  }

  async getUserNotes(user: string) {
    try {
      const client = await pool.connect();
      console.log(user);
      // Check for table existence
      const tableExistsQuery = `SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'notes'
      )`;

      const tableExistsResult = await client.query(tableExistsQuery);

      if (!tableExistsResult.rows[0].exists) {
        console.error('Table "notes" does not exist.');
        return [];
      }

      //check if user exist on notes table
      const userExistQuery = `SELECT COUNT(*) FROM notes WHERE u_name = '${user}';`;

      const userExist: any = await client.query(userExistQuery);
      if (userExist < 1) {
        return [];
      } else {
        const noteQuery = `SELECT u_notes
        FROM notes
        WHERE u_name = '${user}';
        `;
        const noteResult = await client.query(noteQuery);

        client.release();
        return noteResult.rows[0]; // Array of notes objects
      }
      // Fetch notes
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async del() {
    try {
      const checkDbConnection = await checkConnection();
      // console.log(checkConnection);
      const client = await pool.connect();
      if (checkDbConnection === 1) {
        // Check for table existence
        const tableExistsQuery = `SELECT EXISTS (
          SELECT FROM information_schema.tables
          WHERE table_schema = 'public'
          AND table_name = 'notes'
        )`;

        const tableExistsResult = await client.query(tableExistsQuery);

        if (!tableExistsResult.rows[0].exists) {
          // Create users table
          const createTableQuery = `CREATE TABLE notes (u_name VARCHAR(255) UNIQUE, u_notes json)`;
          await client.query(createTableQuery);
        }

        const insertQuery = `INSERT INTO notes ("u_name")
        SELECT '${this.noteObj.user}'
        WHERE NOT EXISTS (
          SELECT 1 FROM notes WHERE u_name = '${this.noteObj.user}'
        )`;
        await client.query(insertQuery);

        //check if name exist
        let result;
        const checkNameQuery = `SELECT u_name FROM notes WHERE u_name = '${this.noteObj.user}'`;
        let nameExist = await client.query(checkNameQuery);

        // if (!nameExist) {
        //   const insertDataQuery = `INSERT INTO notes ("u_notes")
        //   SELECT '${this.noteObj.note}'
        //   WHERE EXISTS (SELECT 1 FROM notes WHERE u_name = '${this.noteObj.user}');`;

        //   result = await client.query(insertDataQuery);
        //   console.log("newINsert");
        // } else {
        const updateDateQuery = `UPDATE notes
          SET u_notes = '${this.noteObj.note}'
          WHERE u_name = '${this.noteObj.user}' RETURNING *;`;

        result = await client.query(updateDateQuery);
        // }
        // console.log(JSON.stringify(result.rows[0]));
        client.release();
        return result.rows[0];
      } else {
        console.log("database not found");
      }
    } catch (error) {
      console.error(error);
      throw error; // Rethrow error for handling
    }
  }
}

export default Notes;
