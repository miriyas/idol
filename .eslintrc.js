module.exports = {
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module",
  },
  "env": {
    "browser": true,
    "node": true,
    "mocha": true,
    "es6": true
  },
  "rules": {
    "linebreak-style": 0,
    "arrow-parens": ["error", "as-needed"],
    "comma-dangle": ["error", "only-multiline"],
    "consistent-return": "off",
    "function-paren-newline": ["error", "consistent"],
    "global-require": "off",
    "indent": "off",
    "implicit-arrow-linebreak": "off",
    "key-spacing": ["error",  { "mode": "minimum" }],
    "max-len": "off",
    "max-lines-per-function": ["warn", 150],
    "no-alert": "off",
    "no-console": "off",
    "no-else-return": "off",
    "no-param-reassign": ["error", { "props": false }],
    "no-trailing-spaces": "warn",
    "no-underscore-dangle": "off",
    "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    "no-useless-escape": "off",
    "no-mixed-operators": "off",
    "no-multi-spaces": ["error", { ignoreEOLComments: true }],
    "object-curly-newline": ["error", { "consistent": true }],
    "object-property-newline": "off",
    "prefer-promise-reject-errors": "warn",
    "prefer-template": "warn",
    "prefer-destructuring": ["error", {"object": true, "array": false}],
    "quote-props": ["error", "as-needed", { "unnecessary": false }],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/destructuring-assignment": "off",
    "react/forbid-prop-types": "warn", // any, object 같은 propTypes 경고
    "react/no-multi-comp": ["error", {"ignoreStateless": true}], // 한 파일에 여러 컴포넌트 만들 수 없게 함
    "react/jsx-first-prop-new-line": ["warn", "multiline"],
    "react/prefer-stateless-function": ["warn", {"ignorePureComponents": true}],
    "react/jsx-closing-tag-location": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-no-target-blank": "warn",
    "react/jsx-key": "warn",
    "react/jsx-no-bind": ["error", {}],
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-pascal-case": "error",
    "react/jsx-no-duplicate-props": "error",
    "react/no-find-dom-node": "warn",
    "react/no-string-refs": "error",
    "react/no-unescaped-entities": ["error", {"forbid": [">", "}"]}],
    "react/prop-types": ["warn", {"skipUndeclared":true}],
    "react/require-default-props": "off",
    "react/sort-comp": ["warn", { order: [
      // 'static-methods',
      'formatter',
      'propTypes',
      'lifecycle',
      'render',
      'everything-else'
    ]}],
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/mouse-events-have-key-events": "off",
    // "jsx-a11y/anchor-is-valid": [
    //   "error",
    //   {
    //     "components": ["Link"],
    //     "specialLink": ["to"],
    //     "aspects": ["noHref", "invalidHref", "preferButton"]
    //   }
    // ],
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "import/default": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-named-as-default": "error",
    "import/no-unresolved": "off",
  },
  "plugins": [
    "react",
    "import"
  ],
  "settings": {
    "import/resolve": {
      "moduleDirectory": ["node_modules", "src"]
    },
  },
  "globals": {
    "__DEVELOPMENT__": true,
    "__CLIENT__": true,
    "__SERVER__": true,
    "__SOCKET__": false,
    "__DISABLE_SSR__": true,
    "__DEVTOOLS__": true,
    "__CORDOVA__": true,
    "__DLLS__": true,
    "socket": true,
    "webpackIsomorphicTools": true,
    "jQuery": true,
    "navigator": true,
    "window": true
  }
};
