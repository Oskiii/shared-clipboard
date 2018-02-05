const net = require("net");
const clipboard = require("copy-paste");

const clients = [];

const server = net.createServer(socket => {
  console.log(socket);
});

server.listen(7555, function() {
  console.log("server started");
});
