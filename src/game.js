import { Board } from './board';
// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.makeMove(0, 1);
// game.makeMove(1, 2);
// When done run `.exit`

class Game{
    constructor(rows, cols, numberOfBombs){
        this._board = new Board(rows,cols,numberOfBombs);
    }

    makeMove(row,col){
        if (row >= this._board._rows || col >= this._board._cols){
            console.log("Out of range");
            return;
        }
        if (this._board.playerBoard[row][col] !== ' '){
            console.log("This tile was already flipped");
        }else if(this._board.bombBoard[row][col] === "B"){
            this._board.flipTile(row, col);
            console.log("You lost!");
        }else{
            this._board.flipTile(row, col);
            if (this._board.hasSafeTile() === 'false'){
            console.log("You won!")
        }
    }
        this._board.printBoard();
    }
}