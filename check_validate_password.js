const mysql = require("mysql2/promise"); // Import promise-compatible version
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function promptPassword() {
  return new Promise((resolve) => {
    rl.question('Enter MySQL password: ', (password) => {
      resolve(password);
    });
  });
}

const dbConfig = {
  host: "localhost",
  user: "root",
};

async function setValidationPolicy(password) {
  const setPolicyQuery = "SET GLOBAL validate_password.policy = 0";

  const connection = await mysql.createConnection({
    ...dbConfig,
    password: password,
  });

  try {
    await connection.query(setPolicyQuery);

    console.log("Validation policy set to 0");
  } catch (err) {
    console.error("Failed to set validation policy:", err);
  } finally {
    connection.end(); // Close the connection
  }
}

async function main() {
  try {
    const password = await promptPassword();

    const connection = await mysql.createConnection({
      ...dbConfig,
      password: password,
    });

    console.log("Connected to MySQL database as id " + connection.threadId);
    // Perform other operations with the connection here

    // Check if validate_password.policy exists
    const checkPolicyQuery = "SHOW VARIABLES LIKE 'validate_password.policy'";
    const [rows] = await connection.query(checkPolicyQuery);

    if (rows.length === 0) {
      console.log("validate_password.policy not found. Skipping policy setting.");
    } else {
      await setValidationPolicy(password);
    }

    connection.end(); // Close the connection

    console.log(`Backend API Server listening`);
  } catch (err) {
    console.error("Error connecting to MySQL database: " + err.stack);
  } finally {
    rl.close(); // Close the readline interface
  }
}

main();
