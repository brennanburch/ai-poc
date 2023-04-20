# Poetic Chatbot POC - Client

Client for the Poetic chatbot proof of concept.

## Requirements

* Node.js 16+
* Yarn - included with Node.js via [`corepack enable`](https://yarnpkg.com/getting-started/install)

## Development

Run `yarn dev` to develop locally.

## Structure

Built using Vite with React and TypeScript. Linting via `xo`. Directory structure based on [this blog post](https://www.joshwcomeau.com/react/file-structure/) by Josh W. Comeau.

Recommended extensions can be found in [`.vscode/extensions.json`](.vscode/extensions.json).

### `xo` Snippet

The following snippet can be placed in `settings.json` to enable auto-formatting with `xo`:

```json
"xo.enable": true,
"xo.format.enable": true,
"[typescript]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "samverschueren.linter-xo"
},
"[typescriptreact]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "samverschueren.linter-xo"
},
```
