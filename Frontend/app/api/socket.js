import { Server } from 'socket.io';

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already attached');
    return res.end();
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", handleConnection);

  return res.end();

  function handleConnection(socket) {
    console.log(`User Connected: ${socket.id}`);
    
    socket.on("join", handleJoin);
    socket.on("ready", handleReady);
    socket.on("ice-candidate", handleIceCandidate);
    socket.on("offer", handleOffer);
    socket.on("answer", handleAnswer);
    socket.on("leave", handleLeave);

    function handleJoin(roomName) {
      const { rooms } = io.sockets.adapter;
      const room = rooms.get(roomName);
      
      if (room === undefined) {
        socket.join(roomName);
        socket.emit("created");
      } else if (room.size === 1) {
        socket.join(roomName);
        socket.emit("joined");
      } else {
        socket.emit("full");
      }
      console.log(rooms);
    }

    function handleReady(roomName) {
      socket.broadcast.to(roomName).emit("ready");
    }

    function handleIceCandidate(candidate, roomName) {
      console.log(candidate);
      socket.broadcast.to(roomName).emit("ice-candidate", candidate);
    }

    function handleOffer(offer, roomName) {
      socket.broadcast.to(roomName).emit("offer", offer);
    }

    function handleAnswer(answer, roomName) {
      socket.broadcast.to(roomName).emit("answer", answer);
    }

    function handleLeave(roomName) {
      socket.leave(roomName);
      socket.broadcast.to(roomName).emit("leave");
    }
  }
};

export default SocketHandler;
