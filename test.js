"use strict";

const gitlab = require("./");

async function main() {
    await gitlab("385475", {
        extract: true,
        unlink: true
    });
}
main().catch(console.error);
