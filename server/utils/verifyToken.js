const jwt = require("jsonwebtoken");

async function verifyToken(token, secretKey) {
  try {
    // Verify the token
    // eslint-disable-next-line no-undef
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
