module.exports = {
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest"
    },
    transformIgnorePatterns: [
        "node_modules/(?!(YOUR_MODULE_NAME)/)"
    ]
};