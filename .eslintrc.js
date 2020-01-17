module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "plugins": [
        "react",
        "eslint-plugin-no-param-reassign-allow-reduce"
    ],
    "env": {
        "browser": true,
        "node": true,
    },
    "ignorePatterns": ["**/*test.js","**/node_modules/"],
    "rules": {
        "react/jsx-props-no-spreading": "off",
        "max-len": [2, {"code": 140, "tabWidth": 4, "ignoreUrls": true}],
        "guard-for-in": "off",
        "no-cond-assign": ["error", "except-parens"],
        "no-console": "off",
        "no-continue": "off",
        "no-mixed-operators": "off",
        "no-plusplus": "off",
        "no-restricted-syntax": ["error", "LabeledStatement", "WithStatement"],
        "no-use-before-define": ["error", {
            "functions": false
        }],
        "object-shorthand": ["error", "consistent"],
        "quotes": ["error", "double"],
        "yoda": ["error", "never", {
            "onlyEquality": true
        }],
        "import/order": "off",
        "comma-dangle": "off",
        "arrow-parens": "off",
        "arrow-body-style": "off",
        "react/jsx-closing-bracket-location": "off",
        "react/jsx-first-prop-new-line": "off",
        "react/forbid-prop-types": ["error", {
            "forbid": ["any", "array"]
        }],
        "react/sort-comp": "off",
        "import/no-extraneous-dependencies": ["error", {
            "devDependencies": true
        }],
        "import/no-unresolved": "off",
        "object-shorthand": "off",
        "no-shadow": "off", 
        "react/prop-types":"off",
        "no-restricted-globals":"off",
    },
}