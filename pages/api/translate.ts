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
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const input = req.body?.untrustedData?.inputText || '';
  const result = input
    .toLowerCase()
    .split('')
    .map((char: string) => blepblopiaCode[char] || char)
    .join(' ') + ' blub';

  // Return frame metadata
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content="https://blepblopia-encoder.vercel.app/og-image.png" />
        <meta name="fc:frame:image:aspect_ratio" content="1.91:1" />
        <meta name="fc:frame:button:1" content="Translate Again" />
        <meta name="fc:frame:button:1:action" content="post" />
        <meta name="fc:frame:button:1:target" content="https://blepblopia-encoder.vercel.app/api/translate" />
        <meta name="fc:frame:input:text" content="Enter text to translate" />
        <meta property="og:title" content="Blepblopia Translator" />
        <meta property="og:description" content="Translated: ${result}" />
        <meta property="og:image" content="https://blepblopia-encoder.vercel.app/og-image.png" />
      </head>
      <body>
        <p>Translated: ${result}</p>
      </body>
    </html>
  `);
}
