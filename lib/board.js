"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
    function Board(rows, cols, numberOfBombs) {
        _classCallCheck(this, Board);

        this._rows = rows;
        this._cols = cols;
        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = rows * cols;
        this._playerBoard = this.generateBoard(rows, cols);
        this._bombBoard = this.generateBoard(rows, cols, numberOfBombs);
    }

    _createClass(Board, [{
        key: "generateBoard",
        value: function generateBoard(rows, cols) {
            var bombs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;


            var board = [];
            for (var row = 0; row < rows; row++) {
                var _row = [];
                for (var col = 0; col < cols; col++) {
                    _row.push(' ');
                }
                board.push(_row);
            }
            if (bombs !== 0) {

                while (bombs > 0) {
                    var randRow = Math.floor(Math.random() * rows);
                    var randCol = Math.floor(Math.random() * cols);
                    if (board[randRow][randCol] !== "B") {
                        board[randRow][randCol] = "B";
                        bombs--;
                    }
                }
            }
            return board;
        }
    }, {
        key: "flipTile",
        value: function flipTile(row, col) {

            if (this.playerBoard[row][col] === ' ') {
                if (this.bombBoard[row][col] === "B") {
                    this.playerBoard[row][col] = "B";
                } else {
                    this.playerBoard[row][col] = this.getNeighboringBombs(row, col);
                    this._numberOfTiles--;
                }
            }
        }
    }, {
        key: "hasSafeTile",
        value: function hasSafeTile() {
            return this._numberOfTiles > 0;
        }
    }, {
        key: "printBoard",
        value: function printBoard() {
            console.log(this.playerBoard.map(function (row) {
                return row.join('|');
            }).join('\n'));
        }
    }, {
        key: "getNeighboringBombs",
        value: function getNeighboringBombs(row, col) {

            var bombNum = 0;
            var rows = this.playerBoard.length;
            var cols = this.playerBoard[0].length;
            var directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

            for (var i = 0; i < directions.length; i++) {
                var direction = directions[i];
                var rowDir = direction[0];
                var colDir = direction[1];

                var newRow = row + rowDir;
                var newCol = col + colDir;

                if (newRow >= 0 && newCol >= 0 && newRow < rows && newCol < cols) {

                    if (this.bombBoard[newRow][newCol] === "B") {
                        bombNum++;
                    }
                }
            }
            return bombNum;
        }
    }, {
        key: "bombBoard",
        get: function get() {
            return this._bombBoard;
        }
    }, {
        key: "playerBoard",
        get: function get() {
            return this._playerBoard;
        }
    }]);

    return Board;
}();