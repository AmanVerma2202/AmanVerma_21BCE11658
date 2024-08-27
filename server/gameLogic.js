class Game {
  constructor() {
    this.board = Array(5).fill(null).map(() => Array(5).fill(null));
    this.players = [];
    this.turn = 0;
    this.gameOver = false;
  }

  addPlayer(playerId, characters) {
    if (this.players.length < 2) {
      const startingRow = this.players.length === 0 ? 4 : 0;
      const color = this.players.length === 0 ? 'white' : 'black'; // Assign colors based on player order
      this.players.push({ id: playerId, characters, startingRow, color });
      this.deployCharacters(playerId, characters, startingRow, color);
    }
  }

  deployCharacters(playerId, characters, row, color) {
    for (let i = 0; i < characters.length; i++) {
      this.board[row][i] = { playerId, character: characters[i], color };
    }
  }

  isValidMove(playerId, from, to) {
    if (this.gameOver) return false;

    const player = this.players[this.turn];
    if (player.id !== playerId) return false;

    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;

    const piece = this.board[fromRow][fromCol];
    if (!piece || piece.playerId !== playerId) return false;

    const target = this.board[toRow][toCol];
    if (target && target.playerId === playerId) return false;

    return this.isValidCharacterMove(piece.character, from, to);
  }

  isValidCharacterMove(character, from, to) {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;

    switch (character) {
      case "Pawn":
        return this.isValidPawnMove(fromRow, fromCol, toRow, toCol);
      case "Hero1":
        return this.isValidHero1Move(fromRow, fromCol, toRow, toCol);
      case "Hero2":
        return this.isValidHero2Move(fromRow, fromCol, toRow, toCol);
      default:
        return false;
    }
  }

  isValidPawnMove(fromRow, fromCol, toRow, toCol) {
    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);

    // Pawn can move one block in any direction (Left, Right, Forward, Backward)
    return rowDiff <= 1 && colDiff <= 1;
  }

  isValidHero1Move(fromRow, fromCol, toRow, toCol) {
    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);

    // Hero1 can move two blocks in a straight line in any direction
    const straightMove = (toRow === fromRow || toCol === fromCol) && rowDiff + colDiff === 2;
    return straightMove;
  }

  isValidHero2Move(fromRow, fromCol, toRow, toCol) {
    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);

    // Hero2 can move two blocks diagonally
    return rowDiff === 2 && colDiff === 2;
  }

  makeMove(playerId, from, to) {
    if (this.isValidMove(playerId, from, to)) {
      const piece = this.board[from[0]][from[1]];
      this.board[to[0]][to[1]] = piece;
      this.board[from[0]][from[1]] = null;

      this.checkForElimination();
      this.turn = (this.turn + 1) % 2;

      if (this.isGameOver()) {
        this.gameOver = true;
      }

      return true;
    }
    return false;
  }


  checkForElimination() {
    const opponentId = this.players[(this.turn + 1) % 2].id;
    const opponentPieces = this.board.flat().filter(piece => piece && piece.playerId === opponentId);
    if (opponentPieces.length === 0) {
      this.gameOver = true;
    }
  }

  isGameOver() {
    return this.gameOver;
  }

  getGameState() {
    const currentPlayer = this.players[this.turn];
    return {
      board: this.board,
      currentTurn: currentPlayer ? currentPlayer.id : null,
      gameOver: this.gameOver,
      winner: this.gameOver ? (currentPlayer ? currentPlayer.id : null) : null,
      players: this.players.map(player => ({ id: player.id, color: player.color }))
    };
  }

  
  
}

module.exports = Game; 

