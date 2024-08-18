"use strict";

const fp = require("fastify-plugin");

/**
 * This plugins adds some utilities to handle cors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(require("@fastify/cors"), {
    origin: "*", // Allow any origin
    methods: ["GET", "POST", "PUT"], // Allow specific HTTP methods
  });
});
