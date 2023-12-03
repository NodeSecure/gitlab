// Import Node.js Dependencies
import { test } from "node:test";
import assert from "node:assert";

// Import Internal Dependency
import { getRepositoryPath } from "../src/utils.js";

test("getRepositoryPath must return id", () => {
  assert.equal(getRepositoryPath("10"), "10");
});

test("getRepositoryPath must return gitlab path", () => {
  assert.equal(getRepositoryPath("nodesecure.boo"), "nodesecure%2Fboo");
});
