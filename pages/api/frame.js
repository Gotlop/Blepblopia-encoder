export default function handler(req, res) {
  console.log('API route /api/frame dipanggil');

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Blepblopia Translator (API Route)</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <!-- OpenGraph tags -->
        <meta property="og:title" content="Blepblopia Translator (API Route)" />
        <meta property="og:description" content="Terjemahkan teks ke kode Blepblopia dan sebaliknya!" />
        <meta property="og:image" content="https://blepblopia-encoder.vercel.app/og-image.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <!-- Farcaster Frame metadata untuk frame interaktif -->
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content="https://blepblopia-encoder.vercel.app/og-image.png" />
        <meta name="fc:frame:image:aspect_ratio" content="1.91:1" />
        <meta name="fc:frame:input:text" content="Masukkan teks untuk diterjemahkan (API Route)" />
        <meta name="fc:frame:button:1" content="Terjemahkan ke Blepblopia" />
        <meta name="fc:frame:button:1:action" content="post" />
        <meta name="fc:frame:button:1:target" content="https://blepblopia-encoder.vercel.app/api/translate-to-blepblopia" />
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />
      </head>
      <body>
        <h2>Blepblopia Translator (API Route)</h2>
        <p>Masukkan teks di Mini App untuk diterjemahkan (via API route).</p>
      </body>
    </html>
  `);
}
