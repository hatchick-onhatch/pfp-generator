import { NextRequest } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

const BASE_CHICK_URL = "https://i.imgur.com/dDD7Jfn.jpeg"; 
// ← Replace with your real Imgur direct link (must end in .jpg or .png)

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const baseStyle = `cute yellow cartoon baby chick, big sparkling eyes with stars, fluffy yellow feathers, orange beak and feet, adorable kawaii style, exactly like the official Hatchfun.xyz mascot`;

    const fullPrompt = `${baseStyle}, ${prompt}, highly detailed, clean white background, perfect PFP`;

    const output = await replicate.run(
      "asiryan/flux-schnell",
      {
        input: {
          prompt: fullPrompt,
          image: BASE_CHICK_URL,
          strength: 0.65,
          num_outputs: 4,
          aspect_ratio: "1:1",
          output_format: "webp",
          output_quality: 90,
        },
      }
    );

    return Response.json({ images: output });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Failed to generate images' }, { status: 500 });
  }
}
