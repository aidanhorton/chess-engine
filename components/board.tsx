import Square from './square';
import styles from './board.module.css';

export default function Board() {
    const board: string[] = Array(64).fill(".");

    return (
        <div className={styles.board}>
            {board.map((value, index) => <Square index={index} key={index} />)}
        </div>
    )
}