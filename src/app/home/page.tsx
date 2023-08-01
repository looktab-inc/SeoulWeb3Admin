"use client"

import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import useCustom from "@/hooks/useCustom";
import {useEffect, useState} from "react";
import CreateTemplateItem from "@/components/CreateTemplateItem";

export default function Home() {
  const custom = useCustom()
  const [nftsList, setNFTS] = useState([])

  useEffect(() => {
    getCollections()
  }, [custom.getAccount()])

  const getCollections = async () => {
    const address = custom.getAddress()
    fetch(`/api/collection/${address}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: address
      }),
    })
      .then(response => response.json())
    .then(response => {
      const {metadata} = response
      console.log(metadata)
      setNFTS(metadata)
    }) .catch(error => {
    // Handle any errors that occurred during the fetch request or data parsing
    console.error('Fetch error:', error);
  });
  }
  return (
    <main className="w-full py-[67px] lg:py-[106px] bg-zinc-100">
      <Header/>
      <div className="w-full p-[40px] bg-zinc-100 flex flex-col justify-center">
        <div className="w-full w-full lg:w-[1000px] p-10 bg-white rounded-[20px] flex-col justify-start items-start mx-auto my-0 gap-5 inline-flex">
          <div className="text-black text-2xl font-bold">만든 템플릿 리스트</div>
          <div className="w-full justify-start items-start gap-4 inline-flex overflow-x-auto">
            <Link
              className="w-[200px] h-[200px] bg-green-500 rounded-2xl justify-center items-center gap-2.5 inline-flex flex-none"
              href={'/nft'}
            >
              <div className="p-4 bg-white bg-opacity-20 rounded-[100px] justify-start items-center gap-1 flex">
                <div className="w-5 h-5 relative mr-[1px]">
                  <Image src={'/images/icons/icon-plus.webp'} alt={'이벤트 생성'} fill/>
                </div>
                <div className="text-white text-lg font-bold">이벤트 생성</div>
              </div>
            </Link>
            {
              nftsList && nftsList.length > 0 &&
              nftsList.map((nft, index) => {
                return <CreateTemplateItem key={index} nft={nft}/>
              }).reverse()
            }
          </div>
        </div>
        <div className="w-full lg:w-[1000px] p-10 my-[40px] bg-white rounded-[20px] flex-col justify-start items-start  mx-auto my-0 gap-5 inline-flex overflow-x-auto">
          <div className="text-zinc-800 text-2xl font-bold">현재 진행중인 캠페인</div>
          <div className="self-stretch justify-start items-start gap-5 inline-flex flex-wrap mb-[20px]">

          </div>
          <div className="w-full text-center">
            <button className="px-[20px] py-[10px] bg-zinc-100 rounded-lg mx-auto my-0">
              <div className="text-zinc-700 text-xs font-normal">+ 더보기</div>
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
