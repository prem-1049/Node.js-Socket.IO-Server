const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve a simple HTML page for testing
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('A client connected:', socket.id);

  // Send messages to the client every 5 seconds
  const interval = setInterval(() => {
    const message = `Server time: ${new Date().toLocaleTimeString()}`;
    socket.emit('message', message);
  }, 5000);

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('A client disconnected:', socket.id);
    clearInterval(interval);
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});