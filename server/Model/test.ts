import pool from "../Config/db";

async function connectAndQuery() {
  // get a client from the pool
  const client = await pool.connect();

  // use the client to run a query
  const res = await client.query(`SELECT * FROM user_t`);
  console.log(res.fields);

  // release the client back to the pool
  client.release();
}

connectAndQuery().then(() => {
  console.log("Done");
});
