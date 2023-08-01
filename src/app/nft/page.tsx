'use client'

import InputMessage from "@/components/InputMessage";
import LNB from "@/components/lnb/LNB";
import ChatList from "@/components/ChatList";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header/>
      <main className="w-full h-[100vh] bg-white flex flex-row pt-[67px] lg:pt-[106px]">
        <LNB/>
        <div className={'flex h-full max-w-full flex-1 flex-col bg-zinc-100'}>
          <div className="relative h-full w-full transition-width flex flex-col items-stretch flex-1">
            <ChatList/>
            <InputMessage/>
          </div>
        </div>
      </main>
    </>
  )
}
