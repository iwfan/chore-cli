workflow "Publish to NPM on push" {
  on = "push"
  resolves = ["publish"]
}

action "build" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "build"
}

action "publish" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "publish"
  secrets = ["NPM_AUTH_TOKEN"]
  needs = ["build"]
}
