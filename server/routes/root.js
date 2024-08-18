'use strict'
const userController = require("../controllers/user.controller");

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  })

  fastify.post('/', async function (request, reply) {
    console.log("HAHAH", request)
    return { root: 123 }
  })

  fastify.get("/user", userController.getAllUsers);
  fastify.get("/user/:id", userController.getUserById);
  fastify.post("/user", userController.createUser);
  fastify.put("/user/:id", userController.updateUser);
  fastify.delete("/user/:id", userController.deleteUser);
}
