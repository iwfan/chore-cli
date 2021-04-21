{
  "parser": "@typescript-eslint/parser",
  "extends": [
    <% if (isReactNeeded) { %>
      "plugin:react/recommended",
    <% } %>
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
   ],
  "parserOptions": {
    "ecmaVersion": 2020,
    <% if (isReactNeeded) { %>
      "ecmaFeatures": {
        "jsx": true
      },
    <% } %>
    "sourceType": "module"
  },
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
