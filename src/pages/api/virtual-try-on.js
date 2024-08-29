import Replicate from "replicate";
import fetch from 'node-fetch';
import { IncomingForm } from 'formidable';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = new IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ message: 'Error parsing form data' });
    }

    try {
      const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
      });

      let human_img, garm_img, mask_img;

      // Handle human_img (previously face_image)
      if (files.face_image) {
        const fileContent = await fs.readFile(files.face_image[0].filepath);
        human_img = `data:${files.face_image[0].mimetype};base64,${fileContent.toString('base64')}`;
      } else {
        return res.status(400).json({ message: 'Missing human image' });
      }

      // Handle garm_img (previously commerce_image)
      if (fields.commerce_image) {
        const commerce_image_url = fields.commerce_image[0];
        if (commerce_image_url.startsWith('/api')) {
          const fullUrl = `${BACKEND_URL}${commerce_image_url.slice(4)}`;
          console.log('Fetching garment image from:', fullUrl);
          const response = await fetch(fullUrl);
          if (!response.ok) {
            throw new Error(`Failed to fetch garment image: ${response.statusText}`);
          }
          const buffer = await response.buffer();
          garm_img = `data:${response.headers.get('content-type')};base64,${buffer.toString('base64')}`;
        } else {
          garm_img = commerce_image_url;
        }
      } else {
        return res.status(400).json({ message: 'Missing garment image' });
      }

      // Handle mask_img (optional)
      if (fields.mask_img) {
        mask_img = fields.mask_img[0];
      }

      // Ensure category is valid
      const validCategories = ["upper_body", "lower_body", "dresses"];
      const category = validCategories.includes(fields.category) ? fields.category : "upper_body";

      const input = {
        crop: fields.crop === "true",
        seed: fields.seed ? parseInt(fields.seed, 10) : -1,
        steps: fields.steps ? parseInt(fields.steps, 10) : 20,
        category: category,
        force_dc: fields.force_dc === "true",
        garm_img: garm_img,
        human_img: human_img,
        garment_des: fields.garment_des || "Unknown garment description",
      };

      // Add mask_img to input only if it's a valid string
      if (mask_img) {
        input.mask_img = mask_img;
      }

      // Add mask_only to input if provided
      if (fields.mask_only) {
        input.mask_only = fields.mask_only === "true";
      }

      console.log('Sending request to Replicate API...');
      const output = await replicate.run(
        "cuuupid/idm-vton:c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d021d3ff4",
        { input }
      );

      console.log('Received response from Replicate API:', output);

      res.status(200).json(output);
    } catch (error) {
      console.error('Error in virtual try-on API:', error);
      res.status(500).json({ 
        message: 'Error processing virtual try-on', 
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  });
}