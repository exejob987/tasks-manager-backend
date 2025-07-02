const blacklistedTokens = new Set();

module.exports = {
  addToken: (token) => blacklistedTokens.add(token),
  isBlacklisted: (token) => blacklistedTokens.has(token),
};
