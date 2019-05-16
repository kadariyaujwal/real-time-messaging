let amqp = require('amqplib/callback_api')
var randomSentence = require('random-sentence');
function generateMessages(n, minPriority, maxPriority){
  var messages = []
  for(i=0; i<n; i++) {
    messages.push({
      message: randomSentence({words:9}),
      timestamp: new Date().getTime(),
      priority: Math.floor(Math.random() * (maxPriority - minPriority) + minPriority)
    })
  }
  return messages
}

amqp.connect('amqp://localhost', (error, connection) => {
  if (error) {
    throw error
  }
  connection.createChannel((error, channel) => {
    if (error) {
      throw error
    }
    var queue = 'realTime'
    channel.assertQueue(queue, {
      durable: false
    })
    setInterval(() => {
      var messages = generateMessages(20, 1, 10)
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(messages)))
    }, 1000)
    
  })   
})

