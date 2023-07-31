"use client"

import useWallet from "@/hooks/useWallet";
import {useRouter} from "next/navigation";

export default function Home() {
  const wallet = useWallet()
  const router = useRouter()

  const handleClickSignIn = () => {
    if (wallet.isLoggedIn()) {
      router.push('/home')
    } else {
      wallet.connectWallet()
        .then(r => {
            console.log(r)
            router.push('/home')
        })
        .catch(error => console.log(error))
    }
  }
  return (
    <main className="w-full min-h-screen flex flex-row relative">
      <div className="w-[500px] h-52 flex-col justify-start items-start gap-10 inline-flex">
        <div className="flex-col justify-center items-start gap-1 flex">
          <div className="text-black text-[56px] font-bold">Sign in</div>
          <div className="text-zinc-700 text-base font-medium">NUPY와 함께 환경을 지켜요!</div>
        </div>
        <button
          className="w-[300px] h-14 px-5 bg-black rounded--xl justify-center items-center gap-3 inline-flex"
          onClick={handleClickSignIn}
        >
          <div className="text-white text-base font-bold">Wallet Login</div>
        </button>
      </div>
    </main>
  )
}
