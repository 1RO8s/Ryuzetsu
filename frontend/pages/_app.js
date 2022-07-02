import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (<>
    <Head>
      <title>Ryuzetsu</title>
      <meta name="description" content="Ryuzetsu" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Component {...pageProps} />
  </>
  )
}

export default MyApp
