# HitWicket Task 

This project implements a unique twist on traditional chess, featuring a smaller 5x5 board and custom characters with unique movement rules. It provides a modern gaming experience with a blend of strategic depth and visual appeal.



### Features
-**5x5 Board:** A compact chessboard that provides a fast-paced game with strategic depth.<br/>
-**Custom Characters:** Four types of characters, each with unique movement and attack patterns:<br/>
-**Pawn:** Moves one block in any direction (Left, Right, Forward, Backward).<br/>
-**Hero1:** Moves two blocks straight in any direction, eliminating any opponent's character in its path.<br/>
-**Hero2:** Moves two blocks diagonally in any direction, eliminating any opponent's character in its path.<br/>
-**Hero3:** Moves two steps straight and one step to the side, killing only the character at its final landing position.<br/>
-**Player Colors:** Each player is assigned a color (white or black) based on their turn.<br/>
-**Move History**: Track and review the sequence of moves made during the game.<br/>
-**Game Over Screen:** Displays the winner when the game ends.<br/>



## How to Run Locally

Clone the repository:

   ```bash
   git clone https://github.com/AmanVerma2202/AmanVerma21BCE11658.git
   cd AmanVerma21BCE11658
 ```
**for server**
```
cd server
npm install
npx nodemon
```
**for client**
```
cd client
npm install
npm run dev 
```

## Demo



## Photos



## Tech Stack

 
**Backend:** Node.js, Express, Socket.io
**Frontend:** React, Vite
**Database:** No database required (in-memory state management)



## Usage
-Open the application in your browser. The React app should be visible.
-Connect as Player 1 or Player 2 and choose your characters.
-Play the game by making moves on the board. The game state will update in real-time.
-Review the move history and observe the game-over screen when applicable.


## Contributing
**Contributions are welcome!** If you want to add new features, fix bugs, or improve documentation, please follow these steps:
```
Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature-branch).
Create a new Pull Request.
```

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
If you have any questions or need further information, feel free to contact me:

Email: aka.amanverma@gmail.com
GitHub: AmanVerma2202
