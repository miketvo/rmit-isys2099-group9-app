
const jwt = require("jsonwebtoken");

/**
 * @description This middleware function verifies the provided JSON Web Token (JWT) and assigns the payload to req.username.
 * The payload of a JWT typically contains information about the user (username in this case), 
 * and any other data that was included when the token was created. 
 * By assigning this payload.username to req.username, this data becomes easily accessible in route handlers. 
 * For example, you could use req.username to get the username of the authenticated user.
 */

async function verifyToken(token, secretKey) {
  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);

    // If verification is successful, the decoded data is returned
    return decoded;
  } catch (err) {
    // If verification fails, an error is thrown
    console.error(err);
    throw err;
  }
}

module.exports = verifyToken;
