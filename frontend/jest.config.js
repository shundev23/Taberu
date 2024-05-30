module.exports = {
  transformIgnorePatterns: [
    "node_modules/(?!(.*@testing-library/dom)/)"
  ],
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  }
};

module.exports = {
  transform: {
    "^.+\\.mjs$": "babel-jest"
  }
};