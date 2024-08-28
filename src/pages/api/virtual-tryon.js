// File: pages/api/virtual-tryon.js

import { client } from "@gradio/client";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { clientImage, productImage } = req.body;

      const app = await client("rlawjdghek/StableVITON");
      const result = await app.predict("/process_hd", [
        await fetch(clientImage).then(r => r.blob()),
        await fetch(productImage).then(r => r.blob()),
        10,  // steps
        true // customized model
      ]);

      res.status(200).json({ resultImage: result.data });
    } catch (error) {
      console.error('Error during virtual try-on:', error);
      res.status(500).json({ error: 'An error occurred during the virtual try-on process.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}