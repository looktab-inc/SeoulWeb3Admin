import Link from "next/link";
import Image from "next/image";
import {NFTType} from "@/util/types/types";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import StorageByWeb3 from "@/util/externals/storage/web3";

const CreateTemplateItem = ({nft}: {nft: NFTType}) => {
  const [imageUrl, setImageUrl] = useState('')
  const storageByWeb3 = new StorageByWeb3()

  return (
    <Link href={`/detail/${nft.nft_collection_id}`}>
      <div className="w-[200px] h-[200px] px-4 pt-7 pb-5 bg-zinc-100 rounded-2xl relative text-center">
        <div className="absolute right-[12px] top-[12px]">
          <Image src={"/images/icons/icon-more.webp"} alt={'show more'} width={16} height={16}/>
        </div>
        <div className="w-[88px] h-[88px] relative my-0 mx-auto">
          <div className="w-[88px] h-[88px] bg-gray-700 rounded-lg relative">
            {
              imageUrl &&   <Image src={imageUrl} alt={'nft image'} fill className={"rounded-lg"}/>
            }
          </div>
        </div>
        <div className="text-black text-base font-bold my-[12px] truncate">{nft.name}</div>
        <div className="text-zinc-500 text-xs font-normal">
          Creation Date {(nft.created_time && dayjs(nft.created_time).format("YYYY. MM. DD")) || ""}
        </div>
      </div>
    </Link>
  )
}

export default CreateTemplateItem