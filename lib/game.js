'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _board = require('./board');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game(rows, cols, numberOfBombs) {
        _classCallCheck(this, Game);

        this._board = new _board.Board(rows, cols, numberOfBombs);
    }

    _createClass(Game, [{
        key: 'makeMove',
        value: function makeMove(row, col) {
            if (row >= this._board._rows || col >= this._board._cols) {
                console.log("Out of range");
                return;
            }
            if (this._board.playerBoard[row][col] !== ' ') {
                console.log("This tile was already flipped");
            } else if (this._board.bombBoard[row][col] === "B") {
                this._board.flipTile(row, col);
                console.log("You lost!");
            } else {
                this._board.flipTile(row, col);
                if (this._board.hasSafeTile() === 'false') {
                    console.log("You won!");
                }
            }
            this._board.printBoard();
        }
    }]);

    return Game;
}();