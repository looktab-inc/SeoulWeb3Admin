import {NextResponse} from 'next/server';
import SolanaHelper from "@/util/externals/blockchain/solanaHelper";

export async function GET (request: Request) {
  const { searchParams } = new URL(request.url)
  const address = searchParams.get('address')
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