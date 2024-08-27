import React, { useState } from "react";
import "./board.css"; // Import the CSS file

function Board({ gameState, onMove }) {
  const { board, currentTurn, players } = gameState;
  const [selectedCell, setSelectedCell] = useState(null);
  const [error, setError] = useState("");

  const getPlayerColor = (playerId) => {
    const player = players.find(p => p.id === playerId);
    return player ? player.color : "black";
  };

  const handleCellClick = (row, col) => {
    if (selectedCell) {
      if (selectedCell[0] === row && selectedCell[1] === col) {
        setSelectedCell(null); // Deselect if clicking the same cell
      } else {
        onMove(selectedCell, [row, col]);
        setSelectedCell(null);
      }
    } else {
      const cellValue = board[row][col];
      if (cellValue && cellValue.playerId === currentTurn) {
        setSelectedCell([row, col]);
        setError("");
      }
    }
  };

  return (
    <div>
      <h2 className="current-turn">Current Turn: Player {currentTurn}</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="board-container">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              className={`board-cell ${(rowIndex + colIndex) % 2 === 0 ? "gray" : "black"}`}
            >
              {cell && (
                <div
                  className="cell-content"
                  style={{ color: getPlayerColor(cell.playerId) }}
                >
                  {cell.character === "Pawn" ? "P" : 
                   cell.character === "Hero1" ? "H1" : 
                   cell.character === "Hero2" ? "H2" : 
                   cell.character === "Hero3" ? "H3" : ""}
                </div>
              )}
              {selectedCell && selectedCell[0] === rowIndex && selectedCell[1] === colIndex && (
                <div className="selected-cell" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Board;

