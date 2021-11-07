// Import Node.js Dependencies
import path from "path";
import { createWriteStream, createReadStream, promises as fs } from "fs";
import { createGunzip } from "zlib";
import { pipeline } from "stream/promises";

// Import Third-party Dependencies
import tar from "tar-fs";
import httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import * as utils from "./src/utils.js";

// CONSTANTS
const kGitlabURL = new URL("https://gitlab.com/api/v4/projects/");

// VARS
let GITLAB_TOKEN = process.env.GITLAB_TOKEN ?? void 0;
let GITLAB_URL = process.env.GITLAB_URL ?? void 0;

export async function download(repository, options = Object.create(null)) {
  if (typeof repository !== "string") {
    throw new TypeError("repository must be a string!");
  }
  const { branch = null, dest = process.cwd(), token = GITLAB_TOKEN } = options;
  const headers = {
    authorization: typeof token === "string" ? `Bearer ${token}` : void 0,
    "user-agent": "NodeSecure"
  };

  const { data: gitlabManifest } = await httpie.get(new URL(utils.getRepositoryPath(repository), GITLAB_URL ?? kGitlabURL), {
    headers, maxRedirections: 1
  });

  const wantedBranch = typeof branch === "string" ? branch : gitlabManifest.default_branch;
  const location = path.join(dest, `${gitlabManifest.name}-${wantedBranch}.tar.gz`);

  // Download the archive with the repositoryId
  const repositoryURL = new URL(`${gitlabManifest.id}/repository/archive.tar.gz?ref=${wantedBranch}`, GITLAB_URL ?? kGitlabURL);
  await httpie.stream("GET", repositoryURL, {
    headers: { ...headers, "Accept-Encoding": "gzip, deflate" },
    maxRedirections: 1
  })(createWriteStream(location));

  return {
    location,
    branch: wantedBranch,
    organization: gitlabManifest.path_with_namespace.split("/")[0],
    repository: gitlabManifest.name
  };
}

export async function downloadAndExtract(repository, options = Object.create(null)) {
  const { removeArchive = true, ...downloadOptions } = options;
  const { branch, dest = process.cwd(), token } = downloadOptions;

  const result = await download(repository, { branch, dest, token });

  const newLocation = path.join(dest, `${result.repository}-${result.branch}`);
  await pipeline(
    createReadStream(result.location),
    createGunzip(),
    tar.extract(newLocation)
  );
  if (removeArchive) {
    await fs.unlink(result.location);
  }

  result.location = newLocation;

  return result;
}

export function setToken(gitlabToken) {
  GITLAB_TOKEN = gitlabToken;
}

export function setUrl(gitlabUrl) {
  GITLAB_URL = gitlabUrl;
}
