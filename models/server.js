//Class that will initialize the  server
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require('path')

const cors = require('cors')

const Sockets = require('./socket')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT || 8000

        // http server
        this.server = http.createServer( this.app )

        //Socket configurations
        this.io = socketio( this.server, { /* configurations */} )
    }

    //Middlewares
    middlewares() {
        this.app.use( express.static( path.resolve( __dirname, '../public') ))

        //CORS
        this.app.use( cors() )
    }

    //Socket configurations
    socketConfigurations() {
        new Sockets( this.io )
    }

    //Method that starts the application
    execute() {

        //Initialise middlewares
        this.middlewares()

        //Socket configuration
        this.socketConfigurations()

        //Initialise server
        this.server.listen( this.port, () => {
            console.log(`Server corriendo en el puesto: ${this.port}`)
        })
    }




}

module.exports = Server