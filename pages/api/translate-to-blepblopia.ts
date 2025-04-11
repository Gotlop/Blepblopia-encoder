import type { NextApiRequest, NextApiResponse } from 'next';

interface BlepblopiaCode {
  [key: string]: string;
}

const blepblopiaCode: BlepblopiaCode = {
  a: 'blep', b: 'blub', c: 'blop', d: 'dlep', e: 'blib',
  f: 'flub', g: 'glop', h: 'hlep', i: 'blip', j: 'jlub',
  k: 'klop', l: 'lblep', m: 'mlub', n: 'nlop', o: 'blopz',
  p: 'pleb', q: 'qlub', r: 'rblub', s: 'slep', t: 'tlop',
  u: 'blubz', v: 'vlep', w: 'wblop', x: 'xlub', y: 'yblep',
  z: 'zlop', ' ': 'bblb',
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metode tidak diizinkan' });
  }

  const input = req.body?.untrustedData?.inputText || '';
  if (!input) {
    return res.status(400).json({ error: 'Input teks diperlukan' });
  }

  const result = input
    .toLowerCase()
    .split('')
    .map((char: string) => blepblopiaCode[char] || char)
    .join(' ') + ' blub';

  // Kembalikan HTML untuk Warpcast Frames
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content="https://blepblopia-encoder.vercel.app/og-image.png" />
        <meta name="fc:frame:image:aspect_ratio" content="1.91:1" />
        <meta name="fc:frame:input:text" content="Masukkan teks untuk diterjemahkan lagi" />
        <meta name="fc:frame:button:1" content="Terjemahkan ke Blepblopia" />
        <meta name="fc:frame:button:1:action" content="post" />
        <meta name="fc:frame:button:1:target" content="https://blepblopia-encoder.vercel.app/api/translate-to-blepblopia" />
        <meta name="fc:frame:button:2" content="Terjemahkan ke Teks" />
        <meta name="fc:frame:button:2:action" content="post" />
        <meta name="fc:frame:button:2:target" content="https://blepblopia-encoder.vercel.app/api/translate-to-text" />
        <meta property="og:title" content="Blepblopia Translator" />
        <meta property="og:description" content="Hasil Terjemahan: ${result}" />
        <meta property="og:image" content="https://blepblopia-encoder.vercel.app/og-image.png" />
      </head>
      <body>
        <p>Hasil Terjemahan: ${result}</p>
      </body>
    </html>
  `);
}
