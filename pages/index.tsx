import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  console.log('Halaman utama dimuat');
  console.log('Rendering Head dengan metadata fc:frame');

  return (
    <>
      <Head>
        <title>Blepblopia Translator</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="screen-orientation" content="portrait" />
        {/* OpenGraph tags for better frame rendering */}
        <meta property="og:title" content="Blepblopia Translator" />
        <meta property="og:description" content="Terjemahkan teks ke kode Blepblopia dan sebaliknya!" />
        <meta property="og:image" content="https://blepblopia-encoder.vercel.app/og-image.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {/* Farcaster Frame metadata */}
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content="https://blepblopia-encoder.vercel.app/og-image.png" />
        <meta name="fc:frame:image:aspect_ratio" content="1.91:1" />
        <meta name="fc:frame:input:text" content="Masukkan teks untuk diterjemahkan" />
        <meta name="fc:frame:button:1" content="Terjemahkan ke Blepblopia" />
        <meta name="fc:frame:button:1:action" content="post" />
        <meta name="fc:frame:button:1:target" content="https://blepblopia-encoder.vercel.app/api/translate-to-blepblopia" />
        {/* Nonaktifkan cache */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </Head>
      <div className={styles.body}>
        <div className={styles.container}>
          <h2>Blepblopia Translator</h2>
          <p>Masukkan teks di Mini App untuk diterjemahkan.</p>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  console.log('getServerSideProps dipanggil');
  // Tambahkan header untuk memastikan cache dinonaktifkan
  context.res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  context.res.setHeader('Pragma', 'no-cache');
  context.res.setHeader('Expires', '0');
  return {
    props: {},
  };
}
