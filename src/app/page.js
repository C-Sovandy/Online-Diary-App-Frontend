import Image from 'next/image'
import styles from './page.module.css'


export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        <a
          href="http://localhost:3000/home"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
           HomePage
          </p>
        </a>
      </div>
    </main>
  )
}
