import Head from 'next/head'
import dynamic from 'next/dynamic'
import Script from 'next/script';

const Cesium = dynamic(
  () => import('../components/Cesium'),
  { ssr: false }
)

export default function Home() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="cesium/Widgets/widgets.css" />
        <script src="milsymbol/milsymbol.js" />
      </Head>
      {/* <Script
        src="milsymbol/milsymbol.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`milsymbol script loaded correctly!`)
        }
      /> */}
      <Cesium />
    </>
  )
}