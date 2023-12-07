const cors = require('cors');
const httpServer = require('http').createServer();

// this part is for to create io instance and configuration cors, and integrate http server with io server.
const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://127.0.0.1:5500', // Replace with your client-side origin
    methods: ['GET', 'POST'], // Allowed methods for requests
    headers: ['Authorization', 'Content-Type'], // Allowed headers
    credentials: true // Allow cookies (optional)
  }
});
 
// () $

const users = {}

io.on('connection', socket => {
  socket.on("new-user", name => {
    users[socket.id] = name;
    socket.broadcast.emit('user-connected', name);
  });
  // receive the response from io
  // response to the io
  // receive the client response 
  socket.on("send-chat-message", data => {
    console.log(data);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', `${users[socket.id]} disconnected`);
    delete users[socket.id];
  });
});

httpServer.listen(3000, () => {
  console.log(`The socket.io server is running on 3000`);
});