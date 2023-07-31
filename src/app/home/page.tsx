"use client"

import useWallet from "@/hooks/useWallet";
import {useRouter} from "next/navigation";
import Header from "@/components/Header";

export default function Home() {
  const wallet = useWallet()
  const router = useRouter()

  return (
    <main className="w-full h-[calc(100vh-106px)] bg-zinc-100">
      <Header/>
      <div className="w-full h-[calc(100vh-106px)] bg-zinc-100 p-[40px]">
        <div className="text-black text-2xl font-bold">만든 캠페인 리스트</div>
      </div>
    </main>
  )
}
