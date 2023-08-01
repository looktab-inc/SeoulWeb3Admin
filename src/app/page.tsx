"use client"

import {useRouter} from "next/navigation";
import Image from "next/image";
import useCustom from "@/hooks/useCustom";

export default function Home() {
  const wallet = useCustom()
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
    <main className="w-full min-h-screen flex relative flex-col-reverse lg:flex-row">
      <div className={'absolute top-[40px] left-[40px] lg:top-[60px] lg:left-[60px]'}>
        <div className="w-[131px] h-[32px] relative">
          <Image src={'/images/logos/logo.webp'} alt={'nupy'} fill sizes={'100vw'}/>
        </div>
      </div>
      <div
        className={"w-full lg:w-[662px] lg:flex-none lg:p-[60px] p-[20px] flex flex-col justify-center items-center bg-[url('/images/backgrounds/bg-paper.webp')] bg-repeat bg-cover"}>
        <div className="lg:w-[500px] lg:h-52 flex-col justify-start items-start gap-10 inline-flex">
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
      </div>
      <div className={"w-full lg:h-[100vh] grow flex justify-center items-center bg-[url('/images/backgrounds/tada-nupy.webp')] bg-no-repeat bg-cover lg:bg-left bg-center"}>
        <Image src={'/images/backgrounds//tada-nupy.webp'} alt={'tada-nupy'} width={1} height={1} className={'opacity-0'}/>
      </div>
    </main>
  )
}
