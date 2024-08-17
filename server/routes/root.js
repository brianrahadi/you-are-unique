'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  })

  fastify.post('/', async function (request, reply) {
    console.log("HAHAH", request)
    return { root: 123 }
  })
}
