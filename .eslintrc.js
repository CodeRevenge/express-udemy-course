module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "airbnb-base"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "comma-dangle": "off",
        "linebreak-style": ["error", process.env.NODE_ENV === 'prod' ? "unix" : "windows"],
        "object-curly-newline": "off"
    }
}