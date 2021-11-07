# Gitlab
![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/NodeSecure/gitlab/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/NodeSecure/gitlab/commit-activity)
![MIT](https://img.shields.io/github/license/mashape/apistatus.svg)
![size](https://img.shields.io/github/repo-size/NodeSecure/gitlab)
![known vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/NodeSecure/gitlab)
![build](https://img.shields.io/github/workflow/status/NodeSecure/gitlab/Node.js%20CI)

Download and (optionaly) extract gitlab repository archive.

## Requirements
- [Node.js](https://nodejs.org/en/) v16 or higher

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

const is = await download("SlimIO.is");
console.log(is.location);
```

## API
```ts
export interface DownloadOptions {
  /**
   * The destination (location) to extract the tar.gz
   *
   * @default process.cwd()
   */
  dest?: string;
  /**
   * The default gitlab branch name (master, main ...). By default it fetch the "default" gitlab branch.
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
}

export type ExtractOptions = DownloadOptions & {
  /**
   * Remove the tar.gz archive after a succesfull extraction
   *
   * @default true
   */
  removeArchive?: boolean;
}

export interface DownloadResult {
  /** Archive or repository location on disk */
  location: string;
  /** Gitlab repository name */
  repository: string;
  /** Gitlab organization name */
  organization: string;
  /** Gitlab branch name */
  branch: string;
}

export function download(repo: string, options?: DownloadOptions): Promise<DownloadResult>;
export function downloadAndExtract(repo: string, options?: ExtractOptions): Promise<DownloadResult>;
export function setToken(gitlabToken: string): void;
export function setUrl(gitlabUrl: string | URL): void;
```

### Private repositories
To work with private repositories you can either setup a `GITLAB_TOKEN` system variable or use `setToken` method:

```js
import * as gitlab from "@nodesecure/gitlab";

gitlab.setToken("...");
```

### Custom gitlab URL
To work with a custom gitlab instance you can either setup a `GITLAB_URL` system variable or use `setUrl` method:

```js
import * as gitlab from "@nodesecure/gitlab";

gitlab.setUrl("...");
```

## Contributors ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License
MIT
