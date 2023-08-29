const generateTokens = require('./generateTokens');

function setTokenCookie(res, username) {

  const tokens = generateTokens(username)
  .then(tokens => {
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
  });

  return tokens;

}

module.exports = setTokenCookie;
