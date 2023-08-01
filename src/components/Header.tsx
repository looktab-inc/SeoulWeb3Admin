'use client'

import Image from "next/image";
import Link from "next/link";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import useCustom from "@/hooks/useCustom";

const Header = () => {
  const wallet = useCustom()
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
    <div className="w-full lg:h-[106px] bg-white fixed top-0 left-0 right-0">
      <div className="w-full px-[20px] py-[12px] lg:px-[48px] lg:py-[32px] flex border border-zinc-200 justify-between items-center w-max-[1824px]">
        <Link className="w-[131px] h-[32px] relative" href={wallet.isLoggedIn() ? "/home" : "/"}>
          <Image src={'/images/logos/logo.webp'} alt={'nupy'} fill sizes={'100vw'}/>
        </Link>
        <div className="justify-start items-end gap-3 flex align-middle items-center">
          <div className="px-3 py-2.5 bg-zinc-100 rounded-[100px] justify-start items-start gap-2.5 flex">
            <div className="text-zinc-800 text-[14px] font-normal">{getDisplayAddress()}</div>
          </div>
          <div className={'relative w-[35px] h-[35px]  lg:h-[41.2px] lg:w-[41.2px]'}>
            <Image src={'/images/profiles/profile.webp'} alt={'user profile'} fill sizes={"10vw"}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header