const mysql = require("mysql2/promise");
const readline = require("readline");
const fs = require("fs").promises;

const stdin = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function promptPassword(user) {
  return new Promise(resolve => {
    stdin.question(`Enter MySQL password for "${user}": `, password => {
      resolve(password);
    });
  });
}

async function promptUser() {
  return new Promise(resolve => {
    stdin.question("Enter MySQL root username: ", user => {
      resolve(user);
    });
  });
}

/**
 * Establishes a connection and sets the MySQL server's global validation policy to 0, in case MySQL has been set up
 * with the validate_password plugin, which would be troublesome for when we want to grant privileges to users.
 *
 * @returns {Promise<void>} - A Promise that resolves when the validation policy is set or rejects if there was an error
 * during the process.
 */
async function setValidationPolicy(connection) {
  try {
    await connection.query(`SET GLOBAL validate_password.policy = 0`);
    console.log("Validation policy set to 0");
  } catch (err) {
    console.error("Failed to set validation policy: ", err);
  }
}

async function executeSetupScript(connection, scriptPath) {
  try {
    let script = await fs
      .readFile(scriptPath, "utf-8")
      .then(res => {
        return res.replaceAll("DELIMITER $$", "");
      })
      .then(res => {
        return res.replaceAll("END $$", "END;");
      })
      .then(res => {
        return res.replaceAll("DELIMITER ;", "");
      });

    await connection.query(script);
    console.log(`Script executed successfully: ${scriptPath}`);
  } catch (err) {
    console.error(`Error executing script ${scriptPath}:`, err);
  }
}

(async () => {
  try {
    const user = await promptUser();
    const password = await promptPassword(user);

    const connection = await mysql.createConnection({
      user: user,
      host: "localhost",
      password: password,
      multipleStatements: true,
    });

    console.log("Connected to MySQL database as id " + connection.threadId);

    // Check if validate_password.policy exists
    const checkPolicyQuery = "SHOW VARIABLES LIKE 'validate_password.policy'";
    const [rows] = await connection.query(checkPolicyQuery);
    if (rows.length === 0) {
      console.log(
        "validate_password.policy not found. Skipping policy setting.",
      );
    } else {
      await setValidationPolicy(connection);
    }

    // Execute SQL setup scripts
    let scripts;
    if (process.argv.length === 2) {
      scripts = [
        "reset.sql",
        "init/tables.sql",
        "init/business_rules.sql",
        "init/users.sql",
      ];
    } else if (process.argv[2] === "--mock") {
      scripts = [
        "reset.sql",
        "init/tables.sql",
        "init/business_rules.sql",
        "init/users.sql",
        "init/mock_data.sql",
      ];
    }

    for (const script of scripts) {
      await executeSetupScript(connection, `${script}`);
    }

    await connection.end(); // Close the connection
    console.log(`Database initialized.`);
  } catch (err) {
    console.error("Error connecting to MySQL database: " + err.stack);
  } finally {
    stdin.close(); // Close the readline interface
  }
})().then(() => {});
