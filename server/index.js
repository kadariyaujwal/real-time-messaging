var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var amqp = require('amqplib/callback_api')
const port = process.env.port || 3000

const publisher = require('./publisher')

app.get('/test',(req,res)=>{
    res.send('Hello world')
})

io.on('connection', (socket) => {
    amqp.connect('amqp://localhost', (error0, connection) => {
        if (error0) {
            throw error0
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1
            }
            var queue = 'realTime'
    
            channel.assertQueue(queue, {
                durable: false
            })
            channel.consume(queue, (msg) => {
                var data = JSON.parse(msg.content.toString())
                var priorityData = data.filter((message)=>{
                    return message.priority>7
                })
                socket.emit('messages', priorityData)
            }, {
                noAck: true
            })
        })
    
    })
})

http.listen(port, () => {
    console.log(`App running on port ${port}`)
})