'use client'

import {useEffect, useRef} from "react";
import useCustom from "@/hooks/useCustom";
import MobileChatList from "@/components/MobileChatList";
import MobileInputMessage from "@/components/MobileInputMessage";

export default function MintAddress({params} : {params: { mintAddress: string }}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const chat = useCustom()

  useEffect(() => {
    if (scrollRef.current) {
      // @ts-ignore
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chat.getChatList()])

  return (
    <>
      <main className="w-full h-[100vh] bg-white flex flex-row">
        <div className={'flex h-full max-w-full flex-1 flex-col bg-zinc-100'}>
          <div className="relative h-full w-full transition-width flex flex-col items-stretch flex-1">
            <MobileChatList/>
            <MobileInputMessage/>
          </div>
        </div>
      </main>
    </>
  )
}
