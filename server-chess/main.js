const express = require("express")
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
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

/*
    for (let i = 0; i < 5; i++) {
        const nextMove = aiMove(boardConfig)
        boardConfig = move(boardConfig, Object.keys(nextMove)[0], Object.values(nextMove)[0])
        printBoard(boardConfig)
    }
*/

(async () => {
    const app = express()
    app.use(morgan('tiny'))
    app.set('trust proxy', 1)
    app.use(bodyParser.json({ limit: '5mb' }))
    app.use(bodyParser.urlencoded({ limit: '5mb', extended: true, parameterLimit: 100 }));
    app.use(cors())

    app.use(express.static('public'))
    app.use(express.urlencoded({ extended:true }))

    app.get('/', async (req, res) => {
        if (req.query.start) return res.send(btoa(JSON.stringify({ fen: fenStart })))
    })

    app.listen(5001, () => {
        console.log("Server is running on http://localhost:5001")
    })
})()