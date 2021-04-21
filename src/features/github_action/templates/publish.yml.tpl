name: Publish package

on:
  push:
    branches:
      - master
  release:
    types: [created]

jobs:
  publish-npm:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [8.x, 10.x, 12.x, 13.x]
    steps:
      - uses: actions/checkout@v1
      - uses: actions/setup-node@v1
        with:
          node-version: 12
          registry-url: https://registry.npmjs.org/
        env:
          CI: true
      - run: yarn install --frozen-lockfile
      - run: yarn test
      - run: yarn build
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v1
        with:
          token: \${{secrets.CODECOV_TOKEN}}
      - run: npm publish
        env:

