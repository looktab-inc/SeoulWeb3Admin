'use client'

import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

export default function Detail({params} : {params: { address: string }}) {
  return (
    <>
      <Header/>
      <main className="w-full min-h-screen bg-zinc-100 pt-[40px]">
        {
          nftInfo &&
          <div className="w-[1000px] px-10 py-7 bg-white rounded-[20px] my-0 mx-auto">
            <div className="pb-7 justify-start items-center gap-5 flex">
              <Link className="w-10 h-10 relative" href={'/home'}>
                <Image src={"/images/icons/icon-prev.webp"} alt={'return to home'} fill/>
              </Link>
              <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                <div className="text-center text-black text-[28px] font-bold">{ nftInfo && nftInfo.name}</div>
                <div className="text-zinc-500 text-xs font-normal">
                  Creation Date {(nftInfo && nftInfo.created_time && dayjs(nftInfo.created_time).format("YYYY. MM. DD")) || "" }
                </div>
              </div>
            </div>
            <div className="border-y border-zinc-200 self-stretch justify-start items-start gap-10 inline-flex py-[24px]">
              <div className="w-[400px] text-left">
                <div className="pb-6 border-b border-zinc-200 pb-[34px]  text-black ">
                  <div className="text-xl font-bold mb-[12px]">Event Type</div>
                  <div className="text-sm font-medium">{(eventType && eventType.title) || ""}</div>
                </div>
                <div className="py-6 border-b border-zinc-200 py-[24px] text-black ">
                  <div className="text-xl font-bold">Collect information</div>
                  <div className="py-[17.5px]">
                    <div className="text-sm font-medium inline-block px-3 py-2 bg-zinc-200 rounded-[100px]">
                      {(collectInformationType && collectInformationType.title) || ""}
                    </div>
                  </div>
                  {
                    collectInformationType &&
                    collectInformationType.type ===  SelectCollectInformationType.GPS &&
                    <div className="text-sm font-medium">
                      <div className="text-zinc-500">address</div>
                      <div className="text-black">{nftInfo.collect_information_info.address}</div>
                    </div>
                  }
                  {
                    collectInformationType &&
                    collectInformationType.type !==  SelectCollectInformationType.GPS &&
                    <div className="text-sm font-medium">
                      <div className="text-zinc-500">display app comment</div>
                      <div className="text-black">{nftInfo.collect_information_info.description}</div>
                    </div>
                  }
                </div>
                <div className="py-6 border-b border-zinc-200 text-black py-[24px]">
                  <div className="text-xl font-bold">Entry code</div>
                  <div className="text-sm font-medium">{nftInfo.enter_code}</div>
                </div>
                <div className="py-6 text-black">
                  <div className="text-xl font-bold mb-[12px]">URL to enter the room</div>
                  <div className="text-sm font-medium">{`https://android_nupy?code=${nftInfo.enter_code}`}</div>
                </div>
              </div>
              <div className="grow shrink basis-0">
                <div className=" text-xl font-bold mb-[20px]">NFT Information</div>
                <div className="w-[120px] h-[120px] relative bg-gradient-to-b from-black to-zinc-900 rounded-xl">
                  {
                    imageUrl && <Image src={imageUrl} alt={'nft image'} fill className={" rounded-xl"}/>
                  }
                </div>
                <div className="text-sm font-medium my-[20px]">
                  <div className="text-zinc-500">title</div>
                  <div className="text-black">{nftInfo.name}</div>
                </div>
                <div className="text-sm font-medium">
                  <div className="text-zinc-500">NFT Description</div>
                  <div className="text-black">{nftInfo.description}</div>
                </div>
                <div className="my-[20px] text-sm font-medium">
                  <div className="text-zinc-500">Activity duration (validity period of channel rooms to be made public to users)</div>
                  <div className="text-black">
                    {`${dayjs(nftInfo.start_time).format("MMM. DD. YYYY")} ~ ${dayjs(nftInfo.end_time).format("MMM. DD. YYYY")}`}
                  </div>
                </div>
                <div className="text-sm font-medium">
                  <div className="text-zinc-500">Number of Releases (total number of NFTs dropped by players)</div>
                  <div className="text-black">five hundred</div>
                </div>
              </div>
            </div>
            <div className="justify-start items-start gap-5 flex mt-[24px]">
              <div className="grow shrink basis-0 p-5 bg-zinc-100 rounded-[20px] justify-between items-center gap-5 flex">
                <div className="justify-start items-center gap-1.5 flex">
                  <div className="w-4 h-4 relative">
                    <Image src={"/images/icons/icon-airdrop.webp"} alt={'airdrop number'} fill/>
                  </div>
                  <div className="text-center text-black text-sm font-bold">Air drop or not</div>
                </div>
                <div className="text-black text-2xl font-bold">200/500</div>
              </div>
              <div className="grow shrink basis-0 p-5 bg-zinc-100 rounded-[20px] justify-between items-center gap-5 flex">
                <div className="justify-start items-center gap-1.5 flex">
                  <div className="w-4 h-4 relative">
                    <Image src={"/images/icons/icon-chat.webp"} alt={'airdrop number'} fill/>
                  </div>
                  <div className="text-center text-black text-sm font-bold">Whether to enter the activity room</div>
                </div>
                <div className="text-black text-2xl font-bold">6039</div>
              </div>
            </div>
          </div>
        }
      </main>
    </>
  )
}
