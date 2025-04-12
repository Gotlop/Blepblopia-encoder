import Head from 'next/head';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

// Define the type for the Blepblopia code mapping
interface BlepblopiaCode {
  [key: string]: string;
}

export default function Home() {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isLandscape, setIsLandscape] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const blepblopiaCode: BlepblopiaCode = {
    a: 'blep', b: 'blub', c: 'blop', d: 'dlep', e: 'blib',
    f: 'flub', g: 'glop', h: 'hlep', i: 'blip', j: 'jlub',
    k: 'klop', l: 'lblep', m: 'mlub', n: 'nlop', o: 'blopz',
    p: 'pleb', q: 'qlub', r: 'rblub', s: 'slep', t: 'tlop',
    u: 'blubz', v: 'vlep', w: 'wblop', x: 'xlub', y: 'yblep',
    z: 'zlop', ' ': 'bblb',
  };

  useEffect(() => {
    console.log('Halaman utama dimuat');
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);

    // Detect mobile device
    const checkIsMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isTouchDevice && isSmallScreen);
    };

    // Handle orientation for mobile devices
    const handleOrientation = () => {
      setIsLandscape(window.matchMedia('(orientation: landscape)').matches);
    };

    checkIsMobile();
    handleOrientation();

    window.addEventListener('resize', () => {
      checkIsMobile();
      handleOrientation();
    });

    return () => {
      window.removeEventListener('resize', checkIsMobile);
      window.removeEventListener('resize', handleOrientation);
    };
  }, []);

  const textToBlepblopia = (text: string): string => {
    return text
      .toLowerCase()
      .split('')
      .map((char) => blepblopiaCode[char] || char)
      .join(' ');
  };

  const blepblopiaToText = (blepblopia: string): string => {
    let cleanedInput = blepblopia.replace(/( blip| blub| blep)$/i, '');
    const words = cleanedInput.split(' ');
    return words
      .map((word) => {
        return (
          Object.keys(blepblopiaCode).find(
            (key) => blepblopiaCode[key].toLowerCase() === word.toLowerCase()
          ) || word
        );
      })
      .join('');
  };

  const translateToBlepblopia = () => {
    const result = textToBlepblopia(input) + ' blub';
    setOutput(result);
  };

  const translateToText = () => {
    const result = blepblopiaToText(input);
    setOutput(result);
  };

  const copyResult = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
      const textarea = document.createElement('textarea');
      textarea.value = output;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Fallback copy failed:', err);
      }
      document.body.removeChild(textarea);
    }
  };

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
        <meta name='fc:frame' content='{"version":"next","imageUrl":"https://blepblopia-encoder.vercel.app/og-image.png","aspectRatio":"3:2","button":{"title":"Translate","action":{"type":"launch_frame","name":"Blepblopia Translator","url":"https://blepblopia-encoder.vercel.app","splashImageUrl":"https://blepblopia-encoder.vercel.app/splash.png","splashBackgroundColor":"#a1a1ff"}}}' />
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000" />
      </Head>
      <div className={styles.body}>
        {isLoading && <div className={styles.loading}>Memuat...</div>}
        {isMobile && isLandscape && (
          <div className={styles.orientationWarning}>
            Harap putar perangkat Anda ke mode potret
          </div>
        )}
        <div className={`${styles.container} ${isLoading ? styles.hidden : ''}`}>
          <h2>Blepblopia Translator</h2>
          <textarea
            className={styles.textarea}
            placeholder="Masukkan teks atau kode Blepblopia"
            value={input}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setInput(e.target.value)
            }
          />
          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={translateToBlepblopia}>
              Teks ke Blepblopia
            </button>
            <button className={styles.button} onClick={translateToText}>
              Blepblopia ke Teks
            </button>
          </div>
          <div className={styles.output}>{output || ' '}</div>
          <button
            className={`${styles.copyButton} ${isCopied ? styles.copied : ''}`}
            onClick={copyResult}
            disabled={!output}
          >
            {isCopied ? 'Tersalin!' : 'Salin Hasil'}
          </button>
        </div>
      </div>
    </>
  );
}
