'use strict';


const Path = require('path');
const Hapi = require('hapi');

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'app')
            }
        }
    }
});

server.connection({
    host: 'localhost',
    port: 8000
});

server.register(require('inert'), (err) => {
  // Add the route
  server.route({
      method: 'GET',
      path:'/',
      handler: function (request, reply) {
          reply.file('index.html');
      }
  });

  // Start the server
  server.start((err) => {

      if (err) {
          throw err;
      }
      console.log('Server running at:', server.info.uri);
  });
});
