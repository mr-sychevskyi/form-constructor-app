module.exports = {
  "extends": [
    "airbnb"
  ],
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
    "jest": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
      "es6": true,
      "classes": true
    },
    "ecmaVersion": 9
  },
  "rules": {
    "no-underscore-dangle": 0,
    "arrow-body-style": [0],
    "react/jsx-no-bind": [0],
    "import/no-unresolved": [0],
    "max-len": [1, 120, 2],
    "no-console": 0,
    "comma-dangle": 0,
    "object-property-newline": 0,
    "no-case-declarations": 0,
    "no-mixed-operators": 0,
    "no-bitwise": 0,
    "arrow-parens": 0,
    "operator-assignment": 0,
    "prefer-template": 0,
    "jsx-a11y/label-has-for": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "no-prototype-builtins": 0,
    "global-require": 0,
    "no-path-concat": 0,
    "consistent-return": 0,
    "no-restricted-syntax": 0,
    "no-restricted-properties": 0,
    "no-extra-boolean-cast": 0,
    "valid-typeof": 0,
    "indent": [2, 2, {"SwitchCase": 1, "flatTernaryExpressions": true}],
    "no-nested-ternary": 0,
    "operator-linebreak": 0,
    "no-sequences": 0,
    "no-shadow": 0,
    "implicit-arrow-linebreak": 0,
    "object-curly-newline": 0,
    "function-paren-newline": 0,
    "react/destructuring-assignment": 0,

    "import/no-extraneous-dependencies": 0,
    "import/extensions": 0,
    "import/prefer-default-export": 0,
    "react/no-string-refs": 0,
    "react/prefer-stateless-function": 0,
    "react/no-danger": 0,
    "react/no-array-index-key": 0,
    "react/no-render-return-value": 0,
    "react/sort-comp": 0,
    "react/jsx-filename-extension": 0,
    "react/forbid-prop-types": 0,
    "react/require-default-props": 0,
    "react/no-unused-prop-types": 0,
    "react/prop-types": 0,
    "jsx-a11y/img-has-alt": 0,
    "jsx-a11y/href-no-hash": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "react/jsx-one-expression-per-line": 0,
    "react/jsx-tag-spacing": 0,

    "no-unneeded-ternary": 0,
    "no-confusing-arrow": ["error", {"allowParens": true}],
    "no-param-reassign": 0,
    "no-plusplus": 0,
    "no-continue": 0,
    "no-script-url": 0,
    "no-debugger": 0,
    "no-constant-condition": ["error", {"checkLoops": false}]
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["src/"]
      }
    },
  },
};
