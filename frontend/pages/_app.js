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
    <div className='border-2 max-w-lg mx-auto'>
    <Header/>
    <Component {...pageProps} />
    </div>
  </>
  )
}

export default MyApp
