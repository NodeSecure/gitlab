"use strict";

// Require Node.js Dependencies
const { join, extname } = require("path");
const { access, rmdir, mkdir, unlink } = require("fs").promises;

// Require Third-party Dependencies
const is = require("@slimio/is");

// Require Internal Dependency
const download = require("../");

// CONSTANTS
const kDownloadDir = join(__dirname, "downloads");

beforeAll(async() => {
    await rmdir(kDownloadDir, { recursive: true });
    await mkdir(kDownloadDir, { recursive: true });
});

afterAll(async() => {
    await new Promise((resolve) => setImmediate(resolve));
    await rmdir(kDownloadDir, { recursive: true });
    try {
        await unlink(join(process.cwd(), "plombier-chauffagiste-master.tar.gz"));
    }
    catch (err) {
        // do nothing
    }
});

test("export should be an AsyncFunction", () => {
    expect(is.asyncFunction(download)).toStrictEqual(true);
});

test("repository must be a string", async() => {
    expect.assertions(2);
    try {
        await download(10);
    }
    catch (error) {
        expect(error.name).toStrictEqual("TypeError");
        expect(error.message).toStrictEqual("repository must be a string!");
    }
});

test("options must be an object!", async() => {
    expect.assertions(2);
    try {
        await download("foo", 10);
    }
    catch (error) {
        expect(error.name).toStrictEqual("TypeError");
        expect(error.message).toStrictEqual("options must be a plain javascript object!");
    }
});

test("extract tar.gz at in the current working dir", async() => {
    const tarGZFile = await download("polychromatic.plombier-chauffagiste");
    await access(tarGZFile);

    expect(extname(tarGZFile)).toBe(".gz");
});

test("download and extract a public gitlab repository", async() => {
    const dirName = await download("polychromatic.plombier-chauffagiste", {
        extract: true,
        dest: kDownloadDir
    });
    await access(dirName);
});
