const jsonServer = require('json-server')

const server = jsonServer.create()
const router = jsonServer.router('database.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))
server.use(router)

// Khởi động server mà không cần chỉ định cổng
module.exports = server
