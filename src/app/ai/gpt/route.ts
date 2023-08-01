import { NextResponse } from 'next/server';
import {Configuration, OpenAIApi} from "openai";
import {Tone} from "@/util/enums/enum";

export async function POST(request: Request) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(configuration)
  const params = await request.json()
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(params.tone, params.keyword),
      temperature: 0.1,
      max_tokens: 2000
    })
    console.log(completion.data.choices)
    return NextResponse.json({ result: completion.data.choices[0].text });
  } catch(error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return NextResponse.json({ error: error.response.data ,  status: error.response.status })
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return NextResponse.json({ error: {
          message: 'An error occurred during your request.',
        },status: 500 })
    }
  }
}

const generatePrompt = (tone: string, keyword: string) => {
  let toneText = ''
  if (tone === Tone.PLEASANT) {
    toneText = ' 친절하게'
  } else if (tone === Tone.FRIENDLY) {
    toneText =  ' 유쾌하게'
  } else if (tone === Tone.PROFESSIONAL) {
    toneText =  ' 전문적으로'
  }
  return`앱에서 특정 행동을 할 경우 포인트를 받을 수 있도록 하려고해.
   아래 키워드를 참고하여 ${toneText} 포인트 획득 방법에 대한 설명을 한글로 자세하게 써줘.
    키워드: ${keyword}`.replace(/\n/g, '')
}
