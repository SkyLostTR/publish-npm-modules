# Publish NPM Modules

Use this extension to quickly publish NPM modules. You can also choose to push your changes to git automatically!

## :star: Features

- Version your NPM modules with `PATCH | MINOR | MAJOR`
- Publish your NPM modules
- Push to GIT
- Create a GitHub Release with the new tag and auto-generated notes

## :clipboard: Usage

1. Press `CTRL+SHIFT+P` to open your `Command Palette`.
2. Type: `NPM: Publish` and choose an option!
3. The tool will version your module, publish it and optionally push it to your GIT repo with correct tags. You can also create a GitHub release automatically.

## :notebook: Release Notes

:ship: it

### 1.1.0

- Better documentation
- Code cleanup

### 1.2.0

- Added commands to create GitHub releases automatically

### 1.0.0

Initial release

## :question: Automatic Release Notes

This extension automatically generates release notes by running
`npx auto-changelog --hide-empty-releases --hide-credit > CHANGELOG.md` and then
creating a GitHub release with `gh release create`. For example:

```bash
npx auto-changelog --hide-empty-releases --hide-credit > CHANGELOG.md
gh release create v1.2.1 -t v1.2.1 -F ./CHANGELOG.md
```

You can also supply the `--generate-notes` flag to `gh release create` if you
want GitHub to guess the notes for you.
