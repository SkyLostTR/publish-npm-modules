const vscode = require('vscode')

function activate(context) {

  // Version the module
  let PUBLISH_PATCH = vscode.commands.registerCommand('publish-npm-module.patch', () => publishModule('patch'))
  let PUBLISH_MINOR = vscode.commands.registerCommand('publish-npm-module.minor', () => publishModule('minor'))
  let PUBLISH_MAJOR = vscode.commands.registerCommand('publish-npm-module.major', () => publishModule('major'))

  // Version the module with GIT support
  let PUBLISH_PATCH_WITH_GIT = vscode.commands.registerCommand('publish-npm-module.withGit.patch', () => publishModule('patch', true))
  let PUBLISH_MINOR_WITH_GIT = vscode.commands.registerCommand('publish-npm-module.withGit.minor', () => publishModule('minor', true))
  let PUBLISH_MAJOR_WITH_GIT = vscode.commands.registerCommand('publish-npm-module.withGit.major', () => publishModule('major', true))

  // Version the module with GIT and GitHub Release support
  let PUBLISH_PATCH_WITH_RELEASE = vscode.commands.registerCommand('publish-npm-module.withRelease.patch', () => publishModule('patch', true, true))
  let PUBLISH_MINOR_WITH_RELEASE = vscode.commands.registerCommand('publish-npm-module.withRelease.minor', () => publishModule('minor', true, true))
  let PUBLISH_MAJOR_WITH_RELEASE = vscode.commands.registerCommand('publish-npm-module.withRelease.major', () => publishModule('major', true, true))

  context.subscriptions.push(PUBLISH_PATCH)
  context.subscriptions.push(PUBLISH_MINOR)
  context.subscriptions.push(PUBLISH_MAJOR)

  context.subscriptions.push(PUBLISH_PATCH_WITH_GIT)
  context.subscriptions.push(PUBLISH_MINOR_WITH_GIT)
  context.subscriptions.push(PUBLISH_MAJOR_WITH_GIT)

  context.subscriptions.push(PUBLISH_PATCH_WITH_RELEASE)
  context.subscriptions.push(PUBLISH_MINOR_WITH_RELEASE)
  context.subscriptions.push(PUBLISH_MAJOR_WITH_RELEASE)
}

exports.activate = activate

function deactivate() {}
exports.deactivate = deactivate

const publishModule = (level, git = false, githubRelease = false) => {
  try {
    const terminal = vscode.window.createTerminal(`Publishing module..`)
    terminal.show()
    terminal.sendText(`npm version ${level}`)
    terminal.sendText('npm publish')

    if (git) terminal.sendText('git push --follow-tags')

    if (githubRelease) {
      const version = require('./package.json').version
      terminal.sendText('auto-changelog --hide-empty-releases --hide-credit > CHANGELOG.md')
      terminal.sendText(`gh release create v${version} -t v${version} -F ./CHANGELOG.md`)
    }

  } catch (err) {
    console.log(err)
    throw err
  }
}
