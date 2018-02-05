const net = require("net");
const IP = "127.0.0.1";
const PORT = 8888;

const clients = [];

const server = net.createServer(socket => {
  console.log("Client connected");
  clients.push(socket);

  // Received data from client, send it to other clients!
  socket.on("data", data => {
    console.log("Got data: " + data);

    for (const client of clients) {
      client.write(data);
    }
  });

  // Client closed connection
  socket.on("end", () => {
    const index = clients.indexOf(socket);
    if (index > -1) {
      console.log("Client disconnected");
      clients.splice(index, -1);
    }
  });

  // Connection error
  socket.on("error", () => {
    const index = clients.indexOf(socket);
    if (index > -1) {
      console.log("Client error or force-quit (disconnected)");
      clients.splice(index, -1);
    }
  });
});

server.listen(PORT, IP);
console.log("Started server at " + IP + ":" + PORT);
