var Hapi = require('hapi'),
    path = require('path'),
    port = process.env.PORT || 3000,
    //server = new Hapi.Server(port),
    server = new Hapi.Server(~~process.env.PORT || 3000, '0.0.0.0'),
    routes = {
        css: {
            method: 'GET',
            path: '/dist/css/{path*}',
            handler: createDirectoryRoute('css')
        },
        js: {
            method: 'GET',
            path: '/dist/js/{path*}',
            handler: createDirectoryRoute('js')
        },
        images: {
            method: 'GET',
            path: '/dist/images/{path*}',
            handler: createDirectoryRoute('images')
        },
        templates: {
            method: 'GET',
            path: '/dist/templates/{path*}',
            handler: createDirectoryRoute('templates')
        },
        spa: {
            method: 'GET',
            path: '/{path*}',
            handler: {
                file: path.join(__dirname, '/dist/index.html')
            }
        }
    };

server.route([ routes.css, routes.js, routes.images, routes.templates, routes.spa ]);
server.start( onServerStarted );

function onServerStarted() {
    console.log( 'Server running on port ', port );
}

function createDirectoryRoute( directory ) {
    return {
        directory: {
            path: path.join(__dirname, '/dist/', directory)
        }
    };
}

module.exports = server;