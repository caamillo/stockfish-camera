// React
import { useEffect, useState } from "react"

function Chessgrid({ piece, pieceName, gridName, isBlack, setHolding }) {

    const dragStart = (e) => {
        console.log(`holding ${ pieceName } (${ gridName })`)
        let element = e.target
        while (element.id == null || element.id.search('-piece') < 0) {
            element = element.parentNode
        }
        setHolding(element)
        console.log(element)
    }

    return (
        <div id={ gridName + '-grid' } className={`flex child:scale-150 justify-center items-center w-[70px] h-[70px] ${ isBlack ? 'bg-[#4b7399]' : 'bg-[#ecead2]' }`}>
            <div key={ pieceName + gridName } id={ pieceName + '-piece' } onMouseDown={ (e) => dragStart(e) }>{ piece }</div>
        </div>
    )
}

export default Chessgrid