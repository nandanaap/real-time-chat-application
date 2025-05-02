var express = require('express')
var app = express()
var socket = require('socket.io')
var cors = require('cors');
const http = require("http");
app.use(express.static('public'))

var server = http.createServer(app);
const io = socket(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
    }
  });

  io.on('connection',(socket)=>{
    console.log('Connection is Made')  //each socket has unique id
    socket.on('send',(data) => {

        console.log(`New Msg received ${data}`)
        io.sockets.emit('receive', {
            ...data,
            id: socket?.id
        })
        
    })
    socket.on('new-user-joined',(data) => {
        console.log(`New user joined ${data?.name}`)
        const payload = {
            ...data,
            id: socket?.id
        }
        io.sockets.emit('new-user-joined', payload)
        
    })
    socket.on('leave',(data) => {
        console.log(`User left ${data?.name}`)
        const payload = {
            ...data,
            id: socket?.id
        }
        io.sockets.emit('leave', payload)
        
    })
})

port = process.env.PORT || 8000
var server = server.listen(port);


