'use client'

import Image from "next/image";
import Link from "next/link";
import useWallet from "@/hooks/useWallet";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

const Header = () => {
  const wallet = useWallet()
  const router = useRouter()

  useEffect(() => {
    if (!wallet.isLoggedIn()) {
      router.push('/')
    }
  }, [])

  const getDisplayAddress = () => {
    const address = wallet.getAccount()?.address
    return `${address?.slice(0, 6)}...${address?.slice(address?.length - 4)}`
  }

  return (
    <div className="w-full h-[106px] relative bg-white fixed top-0 left-0 right-0">
      <div className="w-full px-[48px] py-[32px] flex border border-zinc-200 justify-between items-center w-max-[1824px]">
        <Link className="w-[131px] h-[32px] relative" href={wallet.isLoggedIn() ? "/home" : "/"}>
          <Image src={'/images/logos/logo.webp'} alt={'nupy'} fill sizes={'100vw'}/>
        </Link>
        <div className="justify-start items-end gap-3 flex">
          <div className="px-3 py-2.5 bg-zinc-100 rounded-[100px] justify-start items-start gap-2.5 flex">
            <div className="text-zinc-800 text-[14px] font-normal">{getDisplayAddress()}</div>
          </div>
          <Image src={'/images/profiles/profile.webp'} width={41.2} height={41.2} alt={'user profile'}/>
        </div>
      </div>
    </div>
  )
}

export default Header