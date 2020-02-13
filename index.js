"use strict";

// Require Node.js Dependencies
const { promisify } = require("util");
const { createWriteStream, createReadStream, promises: { unlink } } = require("fs");
const { join } = require("path");
const { createGunzip } = require("zlib");
const stream = require("stream");

// Require Third-party Dependencies
const tar = require("tar-fs");
const is = require("@slimio/is");
const { https } = require("follow-redirects");

// CONSTANTS
const GITLAB_URL = new URL("https://gitlab.com/api/v4/projects/");

// ASYNC
const pipeline = promisify(stream.pipeline);

/**
 * @async
 * @function download
 * @param {*} repository repository
 * @param {*} options options
 * @param {string} [options.branch=master] branch to download
 * @param {string} [options.dest] destination to transfert file
 * @param {boolean} [options.extract] Enable .zip extraction!
 * @param {boolean} [options.unlink] Unlink tar.gz file on extraction
 * @param {string} [options.auth] auth for private repository
 * @returns {Promise<string>}
 *
 * @throws {TypeError}
 */
async function download(repository, options = Object.create(null)) {
    if (typeof repository !== "string") {
        throw new TypeError("repository must be a string!");
    }
    if (!is.plainObject(options)) {
        throw new TypeError("options must be a plain javascript object!");
    }

    // Retrieve options
    const { branch = null, dest = process.cwd(), extract = false, unlink: ulk = true, auth } = options;

    // Search for repositoryId with the manifest request
    const [org, repo] = repository.split(".");
    const gitlabManifest = await new Promise((resolve, reject) => {
        const headers = { "User-Agent": "SlimIO" };
        const options = { headers, timeout: 5000 };
        if (typeof auth === "string") {
            headers.Authorization = `Bearer ${auth}`;
        }

        https.get(new URL(`${org}%2F${repo}`, GITLAB_URL).href, options, (response) => {
            if (response.statusCode === 404) {
                reject(Error(res.statusMessage));
            }
            else {
                let rawData = "";

                response.on("data", (buffer) => (rawData += buffer));
                response.once("error", reject);
                response.once("end", () => resolve(JSON.parse(rawData)));
            }
        }).once("error", reject);
    });
    const defaultBranch = typeof branch === "string" ? branch : gitlabManifest.default_branch;

    // Download the archive with the repositoryId
    const fileDestination = join(dest, `${repo}-${defaultBranch}.tar.gz`);

    await new Promise((resolve, reject) => {
        const headers = {
            "User-Agent": "SlimIO",
            "Accept-Encoding": "gzip, deflate"
        };
        const options = { headers, timeout: 5000 };
        if (typeof auth === "string") {
            headers.Authorization = `Bearer ${auth}`;
        }

        const gitUrl = new URL(`${gitlabManifest.id}/repository/archive.tar.gz?ref=${defaultBranch}`, GITLAB_URL);
        https.get(gitUrl.href, options, (res) => {
            if (res.statusCode === 404) {
                reject(Error(res.statusMessage));
            }
            else {
                res.pipe(createWriteStream(fileDestination));
                res.once("error", reject);
                res.once("end", resolve);
            }
        }).once("error", reject);
    });

    // Extract .tar.gz archive
    if (extract) {
        await pipeline(
            createReadStream(fileDestination),
            createGunzip(),
            tar.extract(dest)
        );
        if (ulk) {
            await unlink(fileDestination);
        }

        return join(dest, `${repo}-${defaultBranch}`);
    }

    return fileDestination;
}

module.exports = download;
