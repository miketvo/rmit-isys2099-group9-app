const mysql = require("mysql2/promise"); // Import promise-compatible version
const readline = require('readline');
const fs = require('fs').promises;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function promptPassword(user) {
  return new Promise((resolve) => {
    rl.question(`Enter MySQL password for ${user} user: `, (password) => {
      resolve(password);
    });
  });
}

async function promptUser() {
  return new Promise((resolve) => {
    rl.question("Enter MySQL user: ", (user) => {
      resolve(user);
    });
  });
}

/**
 * Establishes a connection and sets the MySQL server's global validation policy to 0.
 *
 * @param {string} password - The password used to authenticate with the MySQL root server.
 * @returns {Promise<void>} - A Promise that resolves when the validation policy is set or
 *                           rejects if there was an error during the process.
 */
async function setValidationPolicy(user, password) {

  const setPolicyQuery = "SET GLOBAL validate_password.policy = 0";

  const connection = await mysql.createConnection({
    user: user,
    host: "localhost",
    password: password,
  });

  try {
    await connection.query(setPolicyQuery);

    console.log("Validation policy set to 0");
  } catch (err) {
    console.error("Failed to set validation policy:", err);
  } finally {
    await connection.end(); // Close the connection
  }
}

async function executeSqlScript(connection, scriptPath) {
  try {
    const script = await fs.readFile(scriptPath, 'utf-8');
    const statements = script.split(';').filter(statement => statement.trim() !== '');

    for (const statement of statements) {
      await connection.query(statement + ';');
      console.log(`Statement executed successfully: ${statement}`);
    }
  } catch (err) {
    console.error(`Error executing script ${scriptPath}:`, err);
  }
}

async function main() {
  try {
    const user = await promptUser();
    const password = await promptPassword(user);

    const connection = await mysql.createConnection({
      user: user,
      host: "localhost",
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
      await setValidationPolicy(user,password);
    }

    // Execute SQL scripts
    const scripts = [
      'reset.sql',
      'init/tables.sql',
      'init/business_rules.sql',
      'init/users.sql',
      'init/mock_data.sql',
    ];

    for (const script of scripts) {
      await executeSqlScript(connection, `${script}`);
    }

    await connection.end(); // Close the connection

    console.log(`Backend API Server is listening`);
    console.log(`Using isys2099_group9_app database`)
  } catch (err) {
    console.error("Error connecting to MySQL database: " + err.stack);
  } finally {
    rl.close(); // Close the readline interface
  }
}


main().then(() => {});
