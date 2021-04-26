<pre align="center">

 ╭━━━╮╭╮╱╭╮╭━━━╮╭━━━╮╭━━━╮╱╱╱╱╭━━━╮╭╮╱╱╱╭━━╮
 ┃╭━╮┃┃┃╱┃┃┃╭━╮┃┃╭━╮┃┃╭━━╯╱╱╱╱┃╭━╮┃┃┃╱╱╱╰┫┣╯
┃┃╱╰╯┃╰━╯┃┃┃╱┃┃┃╰━╯┃┃╰━━╮╱╱╱╱┃┃╱╰╯┃┃╱╱╱╱┃┃
┃┃╱╭╮┃╭━╮┃┃┃╱┃┃┃╭╮╭╯┃╭━━╯╭━━╮┃┃╱╭╮┃┃╱╭╮╱┃┃
 ┃╰━╯┃┃┃╱┃┃┃╰━╯┃┃┃┃╰╮┃╰━━╮╰━━╯┃╰━╯┃┃╰━╯┃╭┫┣╮
 ╰━━━╯╰╯╱╰╯╰━━━╯╰╯╰━╯╰━━━╯╱╱╱╱╰━━━╯╰━━━╯╰━━╯

</pre>

<p align="center">
  <a href="https://www.npmjs.com/package/chore-cli" target="_blank">
    <img src="https://img.shields.io/npm/v/chore-cli.svg" alt="npm version" />
  </a>
  <a href="https://github.com/iwfan/chore-cli/actions/workflows/cd-workflow.yml" target="_blank">
    <img src="https://github.com/iwfan/chore-cli/actions/workflows/cd-workflow.yml/badge.svg" />
  </a>
  <a href="https://david-dm.org/iwfan/chore-cli" target="_blank">
    <img src="https://status.david-dm.org/gh/iwfan/chore-cli.svg" alt="dependencies status" />
  </a>

  <img src="https://img.shields.io/badge/Neovim-%233fb622.svg?&logo=neovim&logoColor=white"/>
  <img src="https://img.shields.io/badge/Prettier-%234b4b4b.svg?&logo=prettier"/>

  <a href="https://codecov.io/gh/iwfan/chore-cli" target="_blank">
    <img alt="Documentation" src="https://codecov.io/gh/iwfan/chore-cli/branch/main/graph/badge.svg" />
  </a>
  <a href="https://github.com/iwfan/chore-cli/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

chore-cli is the super assistant for building a typescript library. It can generate development infrastructure for projects or libraries, such as prettier, eslint, husky etc, or even Github Actions Config files. It can save a lot of time every time you create new stuff.

As we know, These tools like eslint, prettier can make the codebase better. But it takes us a lot of time to configure them. If you don't want your enthusiasm for writing code to be consumed by these configurations, and if you don't like doing these annoying "chores" frequently, try chore-cli.

chore cli 是构建 typescript 应用的超级助手。它可以为项目或库生成开发基础设施，如 prettier、eslint、husky 等，甚至是 Github Actions 配置文件。它可以在你每次创造新东西的时候，节省很多时间。

众所周知，像 eslint 和 prettier 这样的工具可以使代码库变得更好。但是我们要花很多时间来配置它们。如果你不想让你写代码的热情被这些配置消耗掉，如果你不喜欢频繁地做这些烦人的“杂务”，那就试试 chore-cli 。

![chore-cli](https://raw.githubusercontent.com/iwfan/chore-cli/main/.github/chore-cmd-line.gif)

## 🚀 Usage

Using `chore-cli` is super easy.

```sh
npx chore-cli <path-to-project>
```

You can also add `chore-cli` as a global dependency.

```sh
pnpm add chore-cli -g
# or
yarn global add chore-cli
# or
npm install chore-cli -g
```

And run

```sh
chore <path-to-project>
```

## ✨ Features

- [x] typescript
- [x] esbuild
- [x] editorconfig
- [x] eslint (@typescript/eslint)
- [x] prettier
- [x] babel
- [x] webpack (optional)
- [x] rollup (optional)
- [x] jest
- [x] react (optional)
- [x] commit message lint
- [x] lint staged
- [x] github actions for CI/CD

## ✅ Todo

- [ ] changelog
- [ ] typedoc
- [ ] styles, such as style lint, Tailwind css
- [ ] parcel
- [ ] Snowpack

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/iwfan/chore-cli/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [iwfan](https://github.com/iwfan).<br />
This project is [MIT](https://github.com/iwfan/chore-cli/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
