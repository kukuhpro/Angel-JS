module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [2, 4 ],
        "linebreak-style": [2, "unix"],
        "quotes": [0, "single"],
        "semi": [2, "always"],
        "no-unused-vars": 1
    }
};