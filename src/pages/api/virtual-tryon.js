import { client } from "@gradio/client";
import fs from 'fs';
import path from 'path';

// Increase the body size limit
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Set desired limit (e.g., 10mb, 50mb)
    },
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { clientImage, productImage } = req.body;

      // Fetch the images as blobs
      const clientImageBlob = await fetch(clientImage).then(r => r.blob());
      const productImageBlob = await fetch(productImage).then(r => r.blob());

      // Initialize the Gradio client
      const app = await client("rlawjdghek/StableVITON");

      // Call the API endpoint with the required parameters
      const result = await app.predict("/process_hd", [
        clientImageBlob,    // Model image blob
        productImageBlob,   // Garment image blob
        10,                 // Steps (numeric value)
        true                // Customized model (boolean)
      ]);

      // Extract the result image from the API response
      const resultImageBase64 = result.data;

      // Save the image to the public folder
      const imagePath = path.join(process.cwd(), 'public', 'tryon-results', `result-${Date.now()}.jpg`);
      fs.writeFileSync(imagePath, Buffer.from(resultImageBase64, 'base64'));

      // Send back the public URL to the saved image
      res.status(200).json({ resultImagePath: `/tryon-results/${path.basename(imagePath)}` });

    } catch (error) {
      console.error('Error during virtual try-on:', error);
      res.status(500).json({ error: 'An error occurred during the virtual try-on process.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
