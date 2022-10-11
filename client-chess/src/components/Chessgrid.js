function Chessgrid({ piece, isBlack }) {
    return (
        <div className={`flex child:scale-150 justify-center items-center w-[70px] h-[70px] ${ isBlack ? 'bg-[#4b7399]' : 'bg-[#ecead2]' }`}>
            { piece }
        </div>
    )
}

export default Chessgrid