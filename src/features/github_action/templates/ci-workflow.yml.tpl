name: CI workflow

on:
  pull_request:
    branches:
      - main
  push:
    branches:
      - main
    paths:
      - src/**
      - tests/**

jobs:
  test_and_build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest]
        node-version: [12.x, 14.x]
    env:
      HUSKY: 0
    steps:
      - uses: actions/checkout@v2

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}

      <% if (usePnpm) { %>
      - name: Cache pnpm modules
        uses: actions/cache@v2
        env:
          cache-name: cache-pnpm-modules
        with:
          path: ~/.pnpm-store
          key: ${{ runner.os }}-build-${{ env.cache-name }}-${{ matrix.node-version }}-${{ hashFiles('**/package.json') }}
          restore-keys: |
            ${{ runner.os }}-build-${{ env.cache-name }}-${{ matrix.node-version }}-

      - uses: pnpm/action-setup@v2.0.0
        with:
          version: 6.0.2
          run_install: |
            - recursive: true
              args: [--frozen-lockfile, --strict-peer-dependencies]

      - name: run lint & test & build
        run: |
          pnpm run lint
          pnpm run test
          pnpm run build
      <% } %>

      <% if (useNpm) { %>
      - name: Cache npm modules
        uses: actions/cache@v2
        env:
          cache-name: cache-npm-modules
        with:
          path: '**/node_modules'
          key: ${{ runner.os }}-build-${{ env.cache-name }}-${{ matrix.node-version }}-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-build-${{ env.cache-name }}-${{ matrix.node-version }}-

      - name: run lint & test & build
        run: |
          npm run lint
          npm run test
          npm run build
      <% } %>

      <% if (useYarn) { %>
      - name: Cache Yarn modules
        uses: actions/cache@v2
        env:
          cache-name: cache-yarn-modules
        with:
          path: '**/node_modules'
          key: ${{ runner.os }}-build-${{ env.cache-name }}-${{ matrix.node-version }}-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-build-${{ env.cache-name }}-${{ matrix.node-version }}-

      - name: run lint & test & build
        run: |
          yarn run lint
          yarn run test
          yarn run build
      <% } %>

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v1
        with:
          token: ${{secrets.CODECOV_TOKEN}}
