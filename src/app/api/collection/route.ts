import {NextResponse} from 'next/server';
import SolanaHelper from "@/util/externals/blockchain/solanaHelper";

export async function POST(request: Request) {
  const {title, description, imageUri, attributes} = await request.json()
  try {
    const solanaHelper = new SolanaHelper()
    const { uri } = await solanaHelper.getOriginalUri(
      title,
      description,
      imageUri,
      attributes
    )
    return NextResponse.json({
      uri
    })
  } catch(error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
    }
    return NextResponse.json({ error: 'error' , status: 500 })
  }
}
