import styles from './layout.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div>
        <div className={styles.header}>
            <Image src="/images/favicon.png" height={50} width={50} alt="Home" className={styles.mainIcon} />
            <Link href="/" className={styles.navigationTextItem}>Home</Link>
            <Link href="/settings" className={styles.navigationTextItem}>Settings</Link>
            <Link href="/debug" className={styles.navigationTextItem}>Debug</Link>
        </div>

        <div className={styles.container}>{children}</div>
    </div>
  )
}