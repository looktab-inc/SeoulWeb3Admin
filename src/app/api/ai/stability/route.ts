import {NextResponse} from 'next/server';

export async function POST(request: Request) {
  const engineId = 'stable-diffusion-512-v2-1'
  const apiHost = process.env.API_HOST ?? 'https://api.stability.ai'
  const apiKey = process.env.STABILITY_API_KEY
  const params = await request.json()
  try {
    if (!apiKey) throw 'Missing Stability API key.'

    const response = await fetch(
      `${apiHost}/v1/generation/${engineId}/text-to-image`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: ` I would like to request an image of a pine tree seed. 
              ${params.description} seeds are known for their small and compact size, 
              yet they embody the beauty of nature. 
              Please create a vibrant and delicate image that captures the essence of a pine tree seed. 
              I envision a seed with intricate details, showcasing the unique characteristics of a pine tree seed.
              Your attention to the natural elements and the subtle nuances of the seed would be greatly appreciated. .
              Example: ${params.description}`
            },
          ],
          cfg_scale: 7,
          clip_guidance_preset: 'FAST_BLUE',
          height: 512,
          width: 512,
          samples: 1,
          steps: 30,
          style_preset: 'comic-book',
          init_image: params.referenceURL
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`Non-200 response: ${await response.text()}`)
    }

    const responseJSON = (await response.json()) as GenerationResponse
    const images = responseJSON.artifacts.map(item => {
      return `data:image/png;base64,${item.base64}`
    })
    return NextResponse.json({
      result: images
    });
  } catch(error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.log('test')
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
    return NextResponse.json({ error: 'error' , status: 500 })
  }
}

export interface GenerationResponse {
  artifacts: Array<{
    base64: string
  }>
}
