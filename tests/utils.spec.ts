import { transformGitUrlToGithubsUrl } from '../src/utils/git_info'

describe('As a isValidDirectory', function () {
  it('should transform to http url', function () {
    const gitUrl = 'git@github.com:iwfan/chore-cli'
    expect(transformGitUrlToGithubsUrl(gitUrl)).toBe(`https://github.com/iwfan/chore-cli`)
  })
})
