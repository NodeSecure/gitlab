// Import Third-party Dependencies
import test from "tape";

// Import Internal Dependency
import { getRepositoryPath } from "../src/utils.js";

test("getRepositoryPath must return id", (tape) => {
  tape.is(getRepositoryPath("10"), "10");

  tape.end();
});

test("getRepositoryPath must return gitlab path", (tape) => {
  tape.is(getRepositoryPath("nodesecure.boo"), "nodesecure%2Fboo");

  tape.end();
});
