## Real Time Messaging Application
### Technology Stack
- Node.js (Implements Publisher and Subscriber for RabbitMQ)
- Angular.js (Displays the filtered messages in frontend)
- RabbitMQ (Open source message queue)
- Socket.io (For implementing websockets)

### Instructions For Setup
1. Clone or Download the repo
2. The repo contains two folders, client(Angularjs) and server(Nodejs)
3. Install node dependicies in both client and server
`cd client && npm install` And `cd server && npm install`
4. Install [RabbitMQ](https://www.rabbitmq.com/download.html) in your machine
5. Install [Angular Cli](https://cli.angular.io/) inside client directory `cd client && npm install -g @angular/cli`
6. `cd server && npm start`
7. `cd client && ng serve`
8. Visit `http://localhost:4200`
9. Publisher publishes 20 messages per second and Subscriber filters those with priority greater than 7, and socket emits the messages which is received in frontend
