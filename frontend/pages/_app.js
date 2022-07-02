import Head from 'next/head'
import '../styles/globals.css'
import { Header } from '../components/layout/header'

function MyApp({ Component, pageProps }) {
  return (<>
    <Head>
      <title>Ryuzetsu</title>
      <meta name="description" content="Ryuzetsu" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header/>
    <Component {...pageProps} />
  </>
  )
}

export default MyApp
