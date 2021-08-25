{
  "root": true,
  "env": {
    "shared-node-browser": true,
    "es2021": true,
    "jest/globals": true
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    <% if (isReactNeeded) { %>
      "ecmaFeatures": {
        "jsx": true
      },
    <% } %>
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
    "jest",
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    <% if (isReactNeeded) { %>
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
    <% } %>
    "plugin:jest/recommended",
    "plugin:prettier/recommended"
  ],
  <% if (isReactNeeded) { %>
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  <% } %>
  "ignorePatterns": ["node_modules/", "dist/"],
  "rules": {
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0
  }
}
