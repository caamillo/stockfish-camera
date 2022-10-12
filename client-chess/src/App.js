// React
import { useState, useEffect } from 'react';

// NPMs
import FENBoard from "fen-chess-board";

// Components
import Chessgrid from './components/Chessgrid';

// Icons
import { ReactComponent as WhiteKing } from './imgs/pieces/K.svg'
import { ReactComponent as BlackKing } from './imgs/pieces/kn.svg'
import { ReactComponent as WhiteQueen } from './imgs/pieces/Q.svg'
import { ReactComponent as BlackQueen } from './imgs/pieces/qn.svg'
import { ReactComponent as WhiteRook } from './imgs/pieces/R.svg'
import { ReactComponent as BlackRook } from './imgs/pieces/rn.svg'
import { ReactComponent as WhiteKnight } from './imgs/pieces/N.svg'
import { ReactComponent as BlackKnight } from './imgs/pieces/nr.svg'
import { ReactComponent as WhiteBishop } from './imgs/pieces/B.svg'
import { ReactComponent as BlackBishop } from './imgs/pieces/bn.svg'
import { ReactComponent as WhitePawn } from './imgs/pieces/P.svg'
import { ReactComponent as BlackPawn } from './imgs/pieces/pn.svg'

// Tailwind
import './tailwind/output.css'

const piece = {
  'K' : <WhiteKing />,
  'k' : <BlackKing />,
  'Q' : <WhiteQueen />,
  'q' : <BlackQueen />,
  'R' : <WhiteRook />,
  'r' : <BlackRook />,
  'N' : <WhiteKnight />,
  'n' : <BlackKnight />,
  'B' : <WhiteBishop />,
  'b' : <BlackBishop />,
  'P' : <WhitePawn />,
  'p' : <BlackPawn />
}

function App() {

  const [chess, setChess] = useState()
  const [holding, setHolding] = useState()

  useEffect(() => {
    // console.log('holding:')
    console.log(holding)
  }, [holding])

  useEffect(() => {
      const mouseUpEvent = (e) => {
          if (!holding) return
          console.log(`dropped`)
          let to = document.elementFromPoint(e.clientX, e.clientY)
          while (to.id == null || to.id.search('-grid') < 0) {
            to = to.parentNode
          }
          console.log(to)
          to.appendChild(holding.piece)
          setHolding(null)
      }

      window.addEventListener('mouseup', mouseUpEvent)

      return () => {
          window.removeEventListener('mouseup', mouseUpEvent)
      }
  })

  useEffect(() => {
    if (!chess) return
    if (chess.status.isFinished) return console.log('FINITO')
    if (chess.status.turn === 'white') return
    console.log(chess)
    const randomPiece = Object.keys(chess.moves)[Math.floor(Math.random() * Object.keys(chess.moves).length)]
    const randomPos = chess.moves[randomPiece][Math.floor(Math.random() * chess.moves[randomPiece].length)]
    console.log(randomPiece, randomPos)
    setTimeout(() => {
      fetch('http://localhost:5001?' + new URLSearchParams({ fen: chess.fen, from: randomPiece, to: randomPos }, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }))
      .then(res => res.text())
      .then(data => setChess(JSON.parse(atob(data))))
    }, 1E3)
  }, [chess])

  useEffect(() => {
    fetch('http://localhost:5001?' + new URLSearchParams({ start: true }), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.text())
    .then(data => setChess(JSON.parse(atob(data))))
  }, [])

  return (
    <section className='flex h-screen justify-center items-center'>
      <div className="grid grid-cols-8 gap-0">
        { chess && (new FENBoard(chess.fen)).board.map((row, c) => {
          return row.map((col, c2) => {
            const cols = 'abcdefgh'
            return (
              <Chessgrid key={ 'grid' + c + c2 } setHolding={ setHolding } piece={ piece[col] } pieceName={ col } gridName={ cols[c2] + Math.abs(8 - c) } isBlack={ c % 2 === 0 ? c2 % 2 : c2 % 2 === 0 } />
            )
          })
        }) }
      </div>
    </section>
  );
}

export default App;