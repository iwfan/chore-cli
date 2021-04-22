{
  "presets": [
    "@babel/preset-env",
    <% if (isReactNeeded) { %>
    "@babel/preset-typescript",
    "@babel/preset-react"
    <% } else { %>
    "@babel/preset-typescript"
    <% } %>
  ],
  "plugins": [
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread"
  ]
}
