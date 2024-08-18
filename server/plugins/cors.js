"use strict";

const fp = require("fastify-plugin");

/**
 * This plugins adds some utilities to handle cors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(require("@fastify/cors"), {
    origin: "http://localhost:5173", // Allow only your frontend's origin
    methods: ["GET", "POST"], // Allow specific HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  });
});
