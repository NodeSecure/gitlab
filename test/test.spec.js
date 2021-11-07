import dotenv from "dotenv";
dotenv.config();

// Import Node.js Dependencies
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";

// Import Third-party Dependencies
import test from "tape";
import is from "@slimio/is";

// Import Internal Dependency
import * as gitlab from "../index.js";

// CONSTANTS
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const kDownloadDir = path.join(__dirname, "downloads");

await fs.mkdir(kDownloadDir);

test("gitlab.download should be an asyncFunction", (tape) => {
  tape.true(is.func(gitlab.download));
  tape.true(is.asyncFunction(gitlab.download));

  tape.end();
});

test("gitlab.downloadAndExtract should be an asyncFunction", (tape) => {
  tape.true(is.func(gitlab.downloadAndExtract));
  tape.true(is.asyncFunction(gitlab.downloadAndExtract));

  tape.end();
});

test("download must throw: repository must be a string!", async(tape) => {
  tape.plan(2);

  try {
    await gitlab.download(10);
  }
  catch (error) {
    tape.strictEqual(error.name, "TypeError");
    tape.strictEqual(error.message, "repository must be a string!");
  }

  tape.end();
});

test("extract tar.gz at in the current working dir", async(tape) => {
  const { location } = await gitlab.download("polychromatic.plombier-chauffagiste");

  await fs.access(location);
  tape.strictEqual(path.extname(location), ".gz");

  tape.end();
});

test("download and extract a public gitlab repository", async(tape) => {
  const { location } = await gitlab.downloadAndExtract("polychromatic.plombier-chauffagiste", {
    dest: kDownloadDir
  });

  await fs.access(location);
  tape.pass();

  tape.end();
});

test("teardown", async(tape) => {
  await new Promise((resolve) => setImmediate(resolve));
  await fs.rm(kDownloadDir, { recursive: true, force: true });

  try {
    await fs.unlink(path.join(process.cwd(), "plombier-chauffagiste-master.tar.gz"));
  }
  catch (err) {
    // do nothing
  }
  finally {
    tape.end();
  }
});
