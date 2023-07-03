import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from '../components/layout';
import Board from '../components/board';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Chess</title>
      </Head>

      <div>
        <h1>Home</h1>
        <Board></Board>
      </div>
    </Layout>
  )
}
