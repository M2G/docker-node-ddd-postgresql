/*eslint-disable*/
const request = require('supertest')
const chai = require('chai')
const container = require('src/container')
const server = container.resolve('server')
const config = container.resolve('config')
const logger = container.resolve('logger')

/**
 * turn off logger since we are testing on winston
 */
logger.transports.forEach((t: { silent: boolean }) => (t.silent = true))
//@ts-ignore
global.expect = chai.expect
//@ts-ignore
global.app = container
//@ts-ignore
global.request = request(server.app)
//@ts-ignore
global.config = config
