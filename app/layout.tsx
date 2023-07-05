import "../styles/globals.css";
import NavBar from '../components/navbar'
import styles from './layout.module.css'

export const metadata = {
  title: 'Chess',
  description: 'Generated by Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <div className={styles.container}>
          {children}
        </div>
      </body>
    </html>
  )
}
