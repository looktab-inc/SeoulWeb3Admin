import {NextResponse} from 'next/server';
import SolanaHelper from "@/util/externals/blockchain/solanaHelper";
import {GenerationResponse} from "@/app/api/ai/stability/route";

export async function POST(request: Request) {
  const {mintAddress, ownerAddress} = await request.json()
  try {
    const solanaHelper = new SolanaHelper()
    const nftByWeb3 = await solanaHelper.findNft(mintAddress)
    const {name, description, attributes} = nftByWeb3.json
    const image = await updateImage('apple tree', 1)

    const uri = await solanaHelper.getOriginalUri(
      name,
      description,
      image,
      attributes
    )
    const update = await solanaHelper.updateNft(name, uri, nftByWeb3)
    solanaHelper.transfer(mintAddress, ownerAddress)
      .then(_ => {
        return NextResponse.json({
          'complete': true
        })
      }).catch(e => {
        console.log(e)
      throw e
    })

  } catch(error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
    }
    return NextResponse.json({ error: 'error' , status: 500 })
  }
}

const updateImage = async (tree: string, level: number) => {
  const engineId = 'stable-diffusion-512-v2-1'
  const apiHost = process.env.API_HOST ?? 'https://api.stability.ai'
  const apiKey = process.env.STABILITY_API_KEY

  try {
    if (!apiKey) throw new Error('Missing Stability API key.')

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
              text: `Create an image of a sprout before the ${tree} is planted in the ground`
            },
          ],
          cfg_scale: 7,
          clip_guidance_preset: 'FAST_BLUE',
          height: 512,
          width: 512,
          samples: 1,
          steps: 30,
          style_preset: 'comic-book'
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
    return images[0]
  } catch(error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.log('test')
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
    return error
  }
}