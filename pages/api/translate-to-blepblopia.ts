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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Tambahkan header CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  console.log('Endpoint /api/translate-to-blepblopia dipanggil');
  console.log('Raw request body:', req.body);

  if (req.method === 'OPTIONS') {
    // Tangani permintaan preflight CORS
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    console.log('Metode tidak diizinkan:', req.method);
    return res.status(405).json({ error: 'Metode tidak diizinkan' });
  }

  let input: string;
  try {
    // Pastikan body adalah JSON yang valid
    let body = req.body;
    if (typeof body === 'string') {
      console.log('Body adalah string, mencoba parse JSON');
      body = JSON.parse(body);
    }

    // Ekstrak inputText dari untrustedData
    input = body?.untrustedData?.inputText || '';
    if (!input) {
      // Jika inputText tidak ada, periksa apakah ada data lain yang relevan
      console.log('Tidak ada inputText, periksa body:', body);
      input = body?.inputText || body?.text || '';
    }
    console.log('Parsed input:', input);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return res.status(400).json({ error: 'Invalid JSON format', details: error.message });
  }

  if (!input) {
    console.log('Input teks tidak ditemukan');
    return res.status(400).json({ error: 'Input teks diperlukan' });
  }

  const result = input
    .toLowerCase()
    .split('')
    .map((char: string) => blepblopiaCode[char] || char)
    .join(' ') + ' blub';

  console.log('Hasil terjemahan:', result);

  // Periksa header Accept untuk menentukan format respons
  const acceptHeader = req.headers.accept || '';
  if (acceptHeader.includes('application/json')) {
    // Kembalikan JSON untuk pengujian manual
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
      input,
      translated: result,
      message: 'Teks berhasil diterjemahkan ke Blepblopia',
    });
  }

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
