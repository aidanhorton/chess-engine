import Square from './Square';
import styles from './Board.module.css';

export default function Board() {
    const board: string[] = Array(64).fill(".");

    return (
        <div className={styles.board}>
            {board.map((_, index) => <Square index={index} key={index} />)}
        </div>
    )
}