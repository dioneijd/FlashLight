require('dotenv').config()

const PORT = process.env.PORT || 3333

const path = require('path')
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/public/client.html')
})
app.get('/mng', (req, res) =>{
    res.sendFile(__dirname + '/public/manager.html')
})


const state = require('./components/state.js')


io.on('connection', socket => {

    console.log('a user connected. ID:', socket.id)

    state.AddClient(socket.id)
    
    socket.emit('clientsUpdated', state.data.clients)
    
    socket.on('colorChanged', (color) => {
        socket.broadcast.emit('colorChanged', color)
    })

    socket.on('disconnect', () => {
        state.RemoveClient(socket.id)
    })

})


http.listen(PORT, () => console.log('server listing on port '+ PORT))