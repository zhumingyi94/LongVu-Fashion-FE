const Replicate = require("replicate");
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

console.log("Current working directory:", process.cwd());

const envPath = path.resolve(process.cwd(), '.env');
const envLocalPath = path.resolve(process.cwd(), '.env.local');

console.log("Looking for .env file at:", envPath);
console.log("Looking for .env.local file at:", envLocalPath);

if (fs.existsSync(envPath)) {
  console.log(".env file found");
  dotenv.config({ path: envPath });
} else if (fs.existsSync(envLocalPath)) {
  console.log(".env.local file found");
  dotenv.config({ path: envLocalPath });
} else {
  console.log("Neither .env nor .env.local file found");
}

async function testReplicateAPI() {
  console.log("REPLICATE_API_TOKEN:", process.env.REPLICATE_API_TOKEN ? "Set (length: " + process.env.REPLICATE_API_TOKEN.length + ")" : "Not set");
  
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  const input = {
    commerce_image: "https://replicate.delivery/pbxt/KryqVJESqbELpIUmGP5tJzobFAA4qQNSCxtmacoc8eV56xOV/O1CN01Pt5KzK1J8GD1vGim3_!!2200674960983.jpg",
    face_image: "https://replicate.delivery/pbxt/Krypy7MKm9yVO5m0dU3hvptvrHCVc4hI9MaNLO1dWCltNMAA/face.jpg",
    seed: -1,
    steps: 20,
    prompt: "RAW photo, 8k uhd, dslr, soft lighting, high quality, film grain, Fujifilm XT3",
    cfg_scale: 7,
    max_width: 1024,
    scheduler: "Karras",
    max_height: 1024,
    sampler_name: "DPM++ 2M SDE",
    negative_prompt: "(deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime, mutated hands and fingers:1.4), (deformed, distorted, disfigured:1.3), poorly drawn, bad anatomy, wrong anatomy, extra limb, missing limb, floating limbs, disconnected limbs, mutation, mutated, ugly, disgusting, amputation",
    denoising_strength: 0.75,
    only_masked_padding_pixels: 4
  };

  try {
    console.log("Starting Replicate API test...");
    console.log("Input:", JSON.stringify(input, null, 2));
    
    const output = await replicate.run(
      "wolverinn/ecommerce-virtual-try-on:39860afc9f164ce9734d5666d17a771f986dd2bd3ad0935d845054f73bbec447",
      { input }
    );

    console.log("API call successful. Output:", JSON.stringify(output, null, 2));
  } catch (error) {
    console.error("Error during API call:", error);
    if (error.response) {
      console.error("Error response:", await error.response.json());
    }
  }
}

testReplicateAPI();