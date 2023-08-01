// @ts-nocheck
import {NextResponse} from 'next/server';
import SolanaHelper from "@/util/externals/blockchain/solanaHelper";

export async function POST(request: Request) {
  const params = await request.json()
  try {
    const solanaHelper = new SolanaHelper()
    const uri = await solanaHelper.getOriginalUri(
      params.title,
      params.description,
      params.imageUri,
      params.attributes
    )
    const result = await solanaHelper.createNft(params.title, params.description, uri)
    return NextResponse.json({
      result
    })
  } catch(error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
    }
    return NextResponse.json({ error: 'error' , status: 500 })
  }
}


export async function GET(request: Request) {
  try {
    const solanaHelper = new SolanaHelper()
    const collections = await solanaHelper.getCollections()
    console.log(collections)
    // @ts-ignore
    const functionArray = []
    // @ts-ignore
    collections.forEach(item => {
      functionArray.push(getMeatData(item))
    })
    return Promise.all(functionArray).then(response => {
      return NextResponse.json(response)
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

const getMeatData = async (item) => {
  return await fetch(item.uri, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json())
    .then(response => {
      item['metadataJson'] = response
      return item
    })
}