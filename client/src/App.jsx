import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Board from "./components/Board";
import CharacterSelect from "./components/CharacterSelect";
import GameOver from "./components/GameOver";
import MoveHistory from "./components/MoveHistory";

const socket = io();

function App() {
  const [gameState, setGameState] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [moveHistory, setMoveHistory] = useState([]);
  const [color, setColor] = useState(null);
  const [playerName, setPlayerName] = useState(""); 

  useEffect(() => {
    socket.on("gameState", (state) => {
      setGameState(state);
      setMoveHistory(state.moveHistory);
      if (state.playerColors && state.playerNames) {
        const player = state.players.find(p => p.name === playerName);
        if (player) {
          setColor(state.playerColors[player.name]); // Update player color based on name
        }
      }
    });

    socket.on("invalidMove", () => {
      alert("Invalid Move!");
    });

    socket.on("gameReset", () => {
      setGameState(null); // Reset the game state on reset
      setMoveHistory([]); // Clear the move history on reset
      setColor(null); // Clear player color on reset
      setPlayerName(""); // Clear player name on reset
    });

    return () => {
      socket.off("gameState");
      socket.off("invalidMove");
      socket.off("gameReset");
    };
  }, [playerName]);

  const handleCharacterSelection = (selectedCharacters) => {
    setCharacters(selectedCharacters);
    // Default color is red if the player is the first one
    const preferredColor = gameState && gameState.players.length === 0 ? "white" : null;
    socket.emit("joinGame",playerName, selectedCharacters, preferredColor);
  };

  const handleMove = (from, to) => {
    socket.emit("makeMove", from, to);
  };

  const handleGameReset = () => {
    socket.emit("resetGame");
  };

  if (!gameState) {
    return (
      <div>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter your name"
        />
        <CharacterSelect onSelect={handleCharacterSelection} />
      </div>
    );
  }

  if (gameState.gameOver) {
    return (
      <div>
        <GameOver winner={gameState.winner} />
        <button onClick={handleGameReset}>Restart Game</button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex" }}>
      <Board gameState={gameState} onMove={handleMove} color={color} />
      <MoveHistory history={moveHistory} players={gameState.players}/> {/* Display move history */}
    </div>
  );
}

export default App;

