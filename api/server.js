const http = require('http')
const express = require('express')
const { Server } = require('socket.io')
const cors = require('cors')

const app = express()
app.use(cors())

const server = http.createServer(app)
const io = new Server(server)

const PORT = process.env.PORT || 4000

io.on('connection', (socket) => {
  console.log('A user connected')

  socket.on('task added', (newTask) => {
    console.log('task added:', newTask)
    socket.broadcast.emit('task added', newTask)
  })

  socket.on('task completed', (id) => {
    console.log('task completed:', id)
    socket.broadcast.emit('task completed', id)
  })

  socket.on('people added', (newPerson) => {
    console.log('person added:', newPerson)
    socket.broadcast.emit('people added', newPerson)
  })

  socket.on('task updated', (id, updatedTask) => {
    console.log('task updated:', id, updatedTask)
    socket.broadcast.emit('task updated', id, updatedTask)
  })

  socket.on('task removed', (id) => {
    console.log('task removed:', id)
    socket.broadcast.emit('task removed', id)
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
