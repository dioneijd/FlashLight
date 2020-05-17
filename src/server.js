const PORT = 3000

const path = require('path')
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/public/index.html')
})


const state = require('./components/state.js')


io.on('connection', socket => {
    console.log('a user connected. ID:', socket.id)

    state.AddClient(socket.id)
    
    socket.emit('stateUpdate', state.data)
    socket.broadcast.emit('stateUpdate', state.data)
    

    socket.on('changeState', newData => {
        state.UpdateState(newData)

        socket.emit('stateUpdate', state.data)
        socket.broadcast.emit('stateUpdate', state.data)
    
    })

    socket.on('disconnect', () => {
        state.RemoveClient(socket.id)
    })

})


http.listen(PORT, () => console.log('server listing on port '+ PORT))