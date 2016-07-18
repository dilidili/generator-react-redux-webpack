module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "amd": true,
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "linebreak-style": [
            "error",
            "unix"
        ],
        "no-unused-vars": ["error", {
            "vars": "all",
            "args": "none"
        }],
        "no-cond-assign": "off",
    }
};