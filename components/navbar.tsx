import styles from './navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function NavBar() {
    return (
        <div className={styles.header}>
            <Image src="/images/favicon.png" height={50} width={50} alt="Home" className={styles.mainIcon} />
            <Link href="/" className={styles.navigationTextItem}>Home</Link>
            <Link href="/settings" className={styles.navigationTextItem}>Settings</Link>
            <Link href="/debug" className={styles.navigationTextItem}>Debug</Link>
        </div>
    )
}