// React
import { useEffect, useState } from "react"

function Chessgrid({ piece, pieceName, gridName, isBlack }) {

    const [isHolded, setIsHolded] = useState(false)

    useEffect(() => {
        if (isHolded) console.log(`holding ${ pieceName } (${ gridName })`)
    }, [isHolded])

    const dragStart = (e) => {
        setIsHolded(true)
        let element = e.target
        while (element.id == null || element.id.search('-piece') < 0) {
            element = element.parentNode
        }
        console.log(element)
    }

    const dragStop = (e) => {
        setIsHolded(false)
    }

    return (
        <div id={ gridName + '-grid' } className={`flex child:scale-150 justify-center items-center w-[70px] h-[70px] ${ isBlack ? 'bg-[#4b7399]' : 'bg-[#ecead2]' }`}>
            <div key={ pieceName + gridName } id={ pieceName + '-piece' } onMouseDown={ (e) => dragStart(e) } >{ piece }</div>
        </div>
    )
}

export default Chessgrid