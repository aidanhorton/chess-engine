const getBoard = x => {
    let boardContent = [];
    for (let i = 0; i < 64; i++) {
        boardContent.push(<p>{i}</p>);
    }
    
    return boardContent;
}

export default function Board() {
    return (
        <div>
            {getBoard()}
        </div>
    )
}