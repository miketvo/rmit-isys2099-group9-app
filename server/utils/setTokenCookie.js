const generateTokens = require('./generateTokens');

const setTokenCookie = (res, username) => {

  const tokens = generateTokens(username)

  console.log('access token: ', tokens.accessToken);
  console.log('refresh token: ', tokens.refreshToken);

  const oneDay = 1000 * 60 * 60 * 24;
  const longerExp = 1000 * 60 * 60 * 24 * 30;

  res.cookie("accessToken", tokens.accessToken, {
    httpOnly: true,
    // secure: true, // later in production
    samesite: "strict",
    expires: new Date(Date.now() + oneDay),
  });

  res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      // secure: true, // later in production
      samesite: "strict",
      expires: new Date(Date.now() + longerExp),
  });

  console.log('response accessToken cookie and refreshToken cookie');
}

module.exports = setTokenCookie;
