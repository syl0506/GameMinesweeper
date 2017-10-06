export class Board{
    constructor(rows, cols, numberOfBombs){
        this._rows = rows;
        this._cols = cols;
        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles =rows*cols;
        this._playerBoard = this.generateBoard(rows,cols);
        this._bombBoard =this.generateBoard(rows,cols,numberOfBombs);



    }

    get bombBoard(){
        return(this._bombBoard);
    }


    get playerBoard(){
        return(this._playerBoard);
    }

    generateBoard(rows, cols, bombs = 0){


        let board = [];
        for (var row = 0; row < rows; row++){
            let row = [];
            for (var col = 0; col < cols; col++){
                row.push(' ');
            }
            board.push(row);
        }
        if (bombs !== 0){

            while (bombs > 0){
                let randRow = Math.floor(Math.random() * rows);
                let randCol = Math.floor(Math.random() * cols);
                if (board[randRow][randCol] !== "B"){
                    board[randRow][randCol] = "B";
                    bombs--;
                }
            }
        }
        return board;
    }

    flipTile(row, col){


        if (this.playerBoard[row][col] === ' '){
            if (this.bombBoard[row][col] === "B"){
                this.playerBoard[row][col] = "B"

            }else{
                this.playerBoard[row][col] = this.getNeighboringBombs(row,col);
                this._numberOfTiles--;

                }
        }
    }

    hasSafeTile(){
        return (this._numberOfTiles > 0);
    }



    printBoard(){
        console.log(this.playerBoard.map(row => row.join('|')).join('\n'));
    }

    getNeighboringBombs(row, col){

        let bombNum = 0;
        let rows = this.playerBoard.length;
        let cols = this.playerBoard[0].length;
        let directions = [[-1,-1], [-1, 0], [-1, 1],[0, -1], [0, 1],[1, -1], [1, 0], [1, 1]];

        for (let i = 0; i < directions.length; i++){
            let direction = directions[i];
            let rowDir = direction[0];
            let colDir = direction[1];

            let newRow = row + rowDir;
            let newCol = col + colDir;


            if (newRow >= 0 && newCol >= 0 && newRow < rows && newCol < cols){

                if (this.bombBoard[newRow][newCol] === "B"){
                    bombNum ++;
                }
            }
        }
        return bombNum;
    }
}
