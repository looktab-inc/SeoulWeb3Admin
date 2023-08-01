// @ts-nocheck
import {NextRequest, NextResponse} from 'next/server';
import SolanaHelper from "@/util/externals/blockchain/solanaHelper";

export async function POST (req: NextRequest) {
  const params = await req.json()
  console.log(params)
  try {
    const solanaHelper = new SolanaHelper()
    const result = await solanaHelper.getCollections()
    console.log(result)
    // @ts-ignore
    const functionArray = []
    result.forEach(item => {
      functionArray.push(getMeatData(item.uri))
    })

    return Promise.all(functionArray).then(response => {
      return NextResponse.json({
        metadata: response
      })
    }).catch(e => {
      console.log(e)
      throw e
    })


  } catch(error: any) {
    console.log(error)
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data)
    }
    return NextResponse.json({ error: 'error' , status: 500 })
  }
}

const getMeatData = async (uri) => {
  return await fetch(uri, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json())
    .then(response => response)
}