const net = require("net");
const copypaste = require("copy-paste");

const IP = "127.0.0.1";
const PORT = 8888;

let lastClipboardData = "";

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
connection.on("end", data => {
  console.log("Disconnected " + data);
  process.exit();
});

// Connection had error (or Ctrl+C)
connection.on("error", data => {
  console.log("Server error (disconnected)");
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
