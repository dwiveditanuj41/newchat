const io = require("socket.io")();

const port = 80;
io.listen(port);

io.on("connection", client => {
  client.on("message", data => {
    io.sockets.emit("result", data);
  });
});
