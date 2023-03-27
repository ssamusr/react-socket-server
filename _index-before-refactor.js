//Servidor de express
const express = require('express')
const app = express()

//Servidor de sockets
const server = require('http').createServer(app)

//Configuración del socket server
const io = require('socket.io')(server)

//Desplegar el directorio publico
app.use( express.static( __dirname + '/public' ))


//En la documentación, el atributo es socket, pero lo podemos encontrar como client. Hace referencia a un cliente conectado
io.on('connection', ( socket ) => {  

    socket.on('message-to-server', ( data ) => {

        io.emit('message-from-server', data)
    })

    /* socket.emit('mensaje-bienvenida', {
        msg: 'Bienvenido al server',
        fecha: new Date()
    }) */

    /* socket.on('mensaje-cliente', ( data ) => {
        console.log( data )
    }) */
})


server.listen(3000, () => {
    console.log('Server corriendo en el puerto: 3000')
})