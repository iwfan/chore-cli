const editorconfig = `# http://editorconfig.org

root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.{js,ts,jsx,tsx}]
spaces_around_brackets = inside

[*.md]
insert_final_newline = false
`

export default async function (options: ChoreOptions) {
  Object.assign(options.files, {
    '.editorconfig': editorconfig
  })
}
