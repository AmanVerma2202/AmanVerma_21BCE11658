import React from "react";

function MoveHistory({ history, players }) {
  const getPlayerName = (playerId) => {
    const player = players.find(p => p.id === playerId);
    return player ? player.name : "Unknown Player";
  };

  return (
    <div>
      <h2>Move History</h2>
      <ul>
        {history.map((move, index) => (
          <li key={index}>
            {getPlayerName(move.playerId)} moved from ({move.from[0]},{move.from[1]}) 
            to ({move.to[0]},{move.to[1]})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MoveHistory;


