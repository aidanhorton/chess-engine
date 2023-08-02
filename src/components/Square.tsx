import styles from './Square.module.css';

export default function Square({ index }: { index: number }) {
    const squareStyle = `${styles.square} ${isDarkSquare(index) ? styles.secondarySquare : ""}`;
    
    return (
        <span className={squareStyle}></span>
    )
}

function isDarkSquare(index: number) {
    const row = Math.floor(index / 8);
    const col = index % 8;

    return (row % 2 === col % 2);
}