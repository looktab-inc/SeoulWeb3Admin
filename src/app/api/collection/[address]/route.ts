import {NextRequest, NextResponse} from 'next/server';
import SolanaHelper from "@/util/externals/blockchain/solanaHelper";

export async function POST (req: NextRequest) {
  const params = await req.json()
  console.log(params)
  try {
    const solanaHelper = new SolanaHelper()
    const result = await solanaHelper.getCollections()
    return NextResponse.json({
      result
    })
  } catch(error: any) {
    console.log(error)
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
    }
    return NextResponse.json({ error: 'error' , status: 500 })
  }
}