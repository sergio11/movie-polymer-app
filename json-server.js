var jsonServer = require('json-server');
var bodyParser = require('body-parser');

// Returns an Express server
var server = jsonServer.create()

// Set default middlewares (logger, static, cors and no-cache)
server.use( bodyParser.json() );       // to support JSON-encoded bodies
server.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
server.use(jsonServer.defaults())



// Returns an Express router
var router = jsonServer.router('peliculas.json')
server.use(router)

server.listen(3000)
