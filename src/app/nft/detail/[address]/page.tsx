'use client'

import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import {useState} from "react";

export default function Detail({params} : {params: { address: string }}) {
  const [nftInfo, setNFTInfo] = useState(null)
  return (
    <>
      <Header/>
      <main className="w-full min-h-screen bg-zinc-100 pt-[40px]">

      </main>
    </>
  )
}
