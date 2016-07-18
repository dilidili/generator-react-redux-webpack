module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "amd": true,
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
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
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
    },
    "settings": {
        "react": {
            "pragma": "React", // Pragma to use, default to "React"
            "version": "15.0" // React version, default to the latest React stable release
        }
    }
};