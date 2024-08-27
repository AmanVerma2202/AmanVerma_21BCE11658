const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const Game = require("./gameLogic");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let game = new Game();
let moveHistory = [];
const playerColors = {}; // Store player colors here
const playerNames = {};

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

io.on("connection", (socket) => {
  console.log(`Player connected: ${socket.id}`);

  // Handle player joining the game
  socket.on("joinGame", (name, characters, preferredColor) => {
    if (game.players.length < 2 && !game.isGameOver()) {
      // Determine player color
      let color;
      if (game.players.length === 0) {
        color = preferredColor || "white"; // First player gets their preferred color or white by default
      } else {
        color = color === "white" ? "black" : "white"; // Second player gets the opposite color
      }

      // Assign color to player
      playerColors[name] = color;
      playerNames[socket.id] = name;

      game.addPlayer(name, characters);
      io.emit("gameState", {
        ...game.getGameState(),
        moveHistory,
        playerColors, // Include player colors in the game state
        playerNames,
      });
    } else {
      socket.emit("gameFullOrOver");
    }
  });

  // Handle player making a move
  socket.on("makeMove", (from, to) => {
    if (!game.isGameOver()) {
      const name = playerNames[socket.id];
      const moveSuccessful = game.makeMove(name, from, to);
      if (moveSuccessful) {
        moveHistory.push({ playerName: name, from, to });
        io.emit("gameState", {
          ...game.getGameState(),
          moveHistory,
          playerColors, // Include updated player colors
          playerNames,
        });

        // Check if the game is over
        if (game.isGameOver()) {
          io.emit("gameOver", {
            winner: game.getGameState().winner,
            moveHistory,
          });
        }
      } else {
        socket.emit("invalidMove");
      }
    }
  });

  // Handle game reset
  socket.on("resetGame", () => {
    if (game.isGameOver()) {
      game = new Game(); // Reset the game instance
      moveHistory = [];  // Clear move history
      io.emit("gameReset"); // Notify all clients
    }
  });

  // Handle player disconnection
  socket.on("disconnect", () => {
    console.log(`Player disconnected: ${socket.id}`);
    // Optionally, handle disconnection logic if necessary
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});



