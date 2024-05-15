// Import Node.js Dependencies
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";
import { test } from "node:test";
import assert from "node:assert";

// Import Third-party Dependencies
import is from "@slimio/is";

// Import Internal Dependency
import * as gitlab from "../index.js";

// CONSTANTS
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const kDownloadDir = path.join(__dirname, "downloads");

await fs.mkdir(kDownloadDir);

test("gitlab.download should be an asyncFunction", () => {
  assert.equal(is.func(gitlab.download), true);
  assert.equal(is.asyncFunction(gitlab.download), true);
});

test("gitlab.downloadAndExtract should be an asyncFunction", () => {
  assert.equal(is.func(gitlab.downloadAndExtract), true);
  assert.equal(is.asyncFunction(gitlab.downloadAndExtract), true);
});

test("download must throw: repository must be a string!", async() => {
  await assert.rejects(
    async() => await gitlab.download(10),
    {
      name: "TypeError",
      message: "repository must be a string!"
    }
  );
});

test("extract tar.gz at in the current working dir", async() => {
  const { location } = await gitlab.download("polychromatic.plombier-chauffagiste");

  await fs.access(location);
  assert.strictEqual(path.extname(location), ".gz");
});

test("download and extract a public gitlab repository", async() => {
  const { location } = await gitlab.downloadAndExtract("polychromatic.plombier-chauffagiste", {
    dest: kDownloadDir
  });

  await assert.doesNotReject(
    async() => await fs.access(location)
  );
});

test("teardown", async() => {
  await new Promise((resolve) => setImmediate(resolve));

  await assert.doesNotReject(
    async() => await fs.rm(kDownloadDir, { recursive: true, force: true })
  );

  await assert.doesNotReject(
    async() => await fs.unlink(path.join(process.cwd(), "plombier-chauffagiste-master.tar.gz"))
  );
});
