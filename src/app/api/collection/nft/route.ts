import {NextResponse} from 'next/server';
import SolanaHelper from "@/util/externals/blockchain/solanaHelper";
import {GenerationResponse} from "@/app/api/ai/stability/route";
import {Web3Storage} from "web3.storage";
import StorageByWeb3 from "@/util/externals/storage/web3";

export async function POST(request: Request) {
  const {mintAddress, ownerAddress} = await request.json()
  try {
    const solanaHelper = new SolanaHelper()
    return solanaHelper.transfer(mintAddress, ownerAddress)
      .then(_ => {
        return NextResponse.json({})
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
