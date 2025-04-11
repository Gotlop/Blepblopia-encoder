import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metode tidak diizinkan' });
  }

  console.log('Webhook diterima:', req.body);
  res.status(200).json({ message: 'Webhook berhasil diproses' });
}
