# Gitlab

![version](https://img.shields.io/badge/dynamic/json.svg?style=for-the-badge&url=https://raw.githubusercontent.com/NodeSecure/gitlab/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=for-the-badge)](https://github.com/NodeSecure/gitlab/graphs/commit-activity)
[![OpenSSF
Scorecard](https://api.securityscorecards.dev/projects/github.com/NodeSecure/gitlab/badge?style=for-the-badge)](https://api.securityscorecards.dev/projects/github.com/NodeSecure/gitlab)
![MIT](https://img.shields.io/github/license/NodeSecure/gitlab.svg?style=for-the-badge)
![build](https://img.shields.io/github/actions/workflow/status/NodeSecure/gitlab/node.js.yml?style=for-the-badge)

Download and (optionaly) extract gitlab repository archive.

## Requirements

- [Node.js](https://nodejs.org/en/) v20 or higher

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i @nodesecure/gitlab
# or
$ yarn add @nodesecure/gitlab
```

## Usage example

```js
import * as gitlab from "@nodesecure/gitlab";

// Note: repository can be either namespace path or repository ID
const result = await gitlab.download(
  "NodeSecure.utils"
);
console.log(result);
```

## API

Both `download` and `downloadAndExtract` functions use the same set of options.

```ts
interface DownloadOptions {
  /**
   * The destination (location) to extract the tar.gz
   *
   * @default process.cwd()
   */
  dest?: string;
  /**
   * The default gitlab branch name (master, main ...).
   * By default it fetch the "default" gitlab branch.
   *
   * @default null
   */
  branch?: string | null;
  /**
   * Authentication token for private repositories
   *
   * @default process.env.GITLAB_TOKEN
   */
  token?: string;
  /**
   * @default https://gitlab.com/api/v4/projects/
   */
  gitlab?: string;
}
```

### download(repository: string, options?: DownloadOptions): Promise< DownloadResult >
Download the tar.gz archive of the GIT repository.

```ts
interface DownloadResult {
  /** Archive or repository location on disk */
  location: string;
  /** Gitlab repository name */
  repository: string;
  /** Gitlab organization name */
  organization: string;
  /** Gitlab branch name */
  branch: string;
}
```

### downloadAndExtract(repository: string, options?: DownloadExtractOptions): Promise< DownloadResult >
Use download but extract the tar.gz archive.

```ts
interface DownloadExtractOptions extends DownloadOptions {
  /**
   * Remove the tar.gz archive after a succesfull extraction
   *
   * @default true
   */
  removeArchive?: boolean;
}
```

## Contributors ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/thomas-gentilhomme/"><img src="https://avatars.githubusercontent.com/u/4438263?v=4?s=100" width="100px;" alt="Gentilhomme"/><br /><sub><b>Gentilhomme</b></sub></a><br /><a href="https://github.com/NodeSecure/gitlab/commits?author=fraxken" title="Code">💻</a> <a href="https://github.com/NodeSecure/gitlab/commits?author=fraxken" title="Documentation">📖</a> <a href="https://github.com/NodeSecure/gitlab/pulls?q=is%3Apr+reviewed-by%3Afraxken" title="Reviewed Pull Requests">👀</a> <a href="#security-fraxken" title="Security">🛡️</a> <a href="https://github.com/NodeSecure/gitlab/issues?q=author%3Afraxken" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://mickaelcroquet.fr"><img src="https://avatars.githubusercontent.com/u/23740372?v=4?s=100" width="100px;" alt="Haze"/><br /><sub><b>Haze</b></sub></a><br /><a href="https://github.com/NodeSecure/gitlab/commits?author=CroquetMickael" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/AlexandreMalaj"><img src="https://avatars.githubusercontent.com/u/32218832?v=4?s=100" width="100px;" alt="Alexandre Malaj"/><br /><sub><b>Alexandre Malaj</b></sub></a><br /><a href="https://github.com/NodeSecure/gitlab/commits?author=AlexandreMalaj" title="Code">💻</a> <a href="https://github.com/NodeSecure/gitlab/commits?author=AlexandreMalaj" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/fabnguess"><img src="https://avatars.githubusercontent.com/u/72697416?v=4?s=100" width="100px;" alt="Kouadio Fabrice Nguessan"/><br /><sub><b>Kouadio Fabrice Nguessan</b></sub></a><br /><a href="#maintenance-fabnguess" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/FredGuiou"><img src="https://avatars.githubusercontent.com/u/99122562?v=4?s=100" width="100px;" alt="FredGuiou"/><br /><sub><b>FredGuiou</b></sub></a><br /><a href="#maintenance-FredGuiou" title="Maintenance">🚧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

MIT
