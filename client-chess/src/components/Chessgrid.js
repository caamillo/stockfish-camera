// React
import { useEffect, useState } from "react"

function Chessgrid({ piece, pieceName, gridName, isBlack, setHolding }) {

    const dragStart = (e) => {
        console.log(`holding ${ pieceName } (${ gridName })`)
        let from = e.target
        let pieceBoard = e.target
        while (from.id == null || from.id.search('-grid') < 0) {
            from = from.parentNode
        }
        while (pieceBoard.id == null || pieceBoard.id.search('-piece') < 0) {
            pieceBoard = pieceBoard.parentNode
        }
        setHolding({ from: from, piece: pieceBoard })
    }

    return (
        <div id={ gridName + '-grid' } className={`flex child:scale-150 justify-center items-center w-[70px] h-[70px] ${ isBlack ? 'bg-[#4b7399]' : 'bg-[#ecead2]' }`}>
            <div key={ pieceName + gridName } id={ pieceName + '-piece' } onMouseDown={ (e) => dragStart(e) }>{ piece }</div>
        </div>
    )
}

export default Chessgrid