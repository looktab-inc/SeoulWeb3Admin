import {NextResponse} from 'next/server';
import SolanaHelper from "@/util/externals/blockchain/solanaHelper";

export async function POST(request: Request) {
  const {mintAddress} = await request.json()
  try {
    const solanaHelper = new SolanaHelper()
    const result = await solanaHelper.findNft(mintAddress)
    console.log(result)
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