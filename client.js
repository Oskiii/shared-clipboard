const net = require("net");
const copypaste = require("copy-paste");

// const IP = '127.0.0.1';
const PORT = 8888;

let lastClipboardData = "";

if (process.argv.length !== 3) {
  console.log("Usage: node client.js [SERVER IP]");
  process.exit();
}
const IP = process.argv[2];

// Create connection to server
const connection = net.connect(PORT, IP, () => {
  console.log("Connected to " + IP + ":" + PORT);
  checkClipboardAndPost();
});

// Received data from connection
connection.on("data", data => {
  console.log("Received data from server: " + data);
  copypaste.copy(data);
});

// Connection ended
connection.on("end", () => {
  console.log("Disconnected ");
  process.exit();
});

// Connection had error (or Ctrl+C)
connection.on("error", err => {
  console.log("Server error (disconnected) " + err);
  process.exit();
});

// Check clipboard in intervals
const checkInterval = setInterval(checkClipboardAndPost, 1000);

// If clipboard is different than last time we checked, post it to server!
function checkClipboardAndPost() {
  // Paste clipboard to variable
  let clipboardData = copypaste.paste();
  if (clipboardData !== lastClipboardData) {
    connection.write(clipboardData);
    lastClipboardData = clipboardData;
  }
}
