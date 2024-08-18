"use strict";
const fs = require("node:fs");
const util = require("node:util");
const { pipeline } = require("node:stream");
const pump = util.promisify(pipeline);

module.exports = async function (fastify, opts) {
  fastify.get("/", async function (request, reply) {
    return { root: true };
  });

  fastify.post("/record", async function (request, reply) {
    const data = await request.file();
    await pump(data.file, fs.createWriteStream(data.filename));

    return { status: 200 };
  });
};
