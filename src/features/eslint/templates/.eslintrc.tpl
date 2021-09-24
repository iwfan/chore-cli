{
  "root": true,
  "overrides": [
    {
      "env": {
        "shared-node-browser": true,
        "es2021": true,
        "jest/globals": true
      },
      "files": ["**/*.ts", "**/*.tsx"],
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
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
      "rules": {
        "@typescript-eslint/explicit-function-return-type": 0,
        "@typescript-eslint/explicit-module-boundary-types": 0
      }
    },
    {
      "files": ["**/*.js", "**/*.jsx"],
      "parser": "espree",
      "extends": ["eslint:recommended", "plugin:prettier/recommended"],
      "env": {
        "node": true,
        "es2021": true
      },
      "rules": {}
    }
  ],
  "ignorePatterns": ["node_modules/", "dist/"]
}
