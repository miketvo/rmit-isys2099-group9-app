function setTokenCookie(res, token) {
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    SameSite: "strict",
    expires: new Date(Number(new Date()) + 30 * 60 * 1000),
  });
}

module.exports = setTokenCookie;
