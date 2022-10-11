const jsChessEngine = require('js-chess-engine')
const { move, status, moves, aiMove, getFen } = jsChessEngine
const { Position } = require('kokopu')

const fenStart = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
const example = '3Q2nr/1b5p/2k5/2pp1pB1/2P5/6P1/PP2KPBP/RN5R w - - 7 19'

let boardConfig = fenStart

const printBoard = (fen) => {
    const position = new Position(fen)
    console.log(position.ascii())
}

for (let i = 0; i < 5; i++) {
    const nextMove = aiMove(boardConfig)
    boardConfig = move(boardConfig, Object.keys(nextMove)[0], Object.values(nextMove)[0])
    printBoard(boardConfig)
}