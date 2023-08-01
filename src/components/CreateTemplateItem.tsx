import Link from "next/link";
import Image from "next/image";
import {NFTType} from "@/util/types/types";
import dayjs from "dayjs";

const CreateTemplateItem = ({nft}: {nft: NFTType}) => {
  const createTime = nft.attributes.find(attribute => attribute.trait_type === 'created_time')
  const image = nft.attributes.find(attribute => attribute.trait_type === 'cover_image')
  return (
    <Link href={`/detail/`}>
      <div className="w-[200px] h-[200px] px-4 pt-7 pb-5 bg-zinc-100 rounded-2xl relative text-center">
        <div className="absolute right-[12px] top-[12px]">
          <Image src={"/images/icons/icon-more.webp"} alt={'show more'} width={16} height={16}/>
        </div>
        <div className="w-[88px] h-[88px] relative my-0 mx-auto">
          <div className="w-[88px] h-[88px] bg-gray-700 rounded-lg relative">
            {
              image &&   <Image src={image.value} alt={'nft image'} fill className={"rounded-lg"}/>
            }
          </div>
        </div>
        <div className="text-black text-base font-bold my-[12px] truncate">{nft.name}</div>
        {
          createTime  &&
          <div className="text-zinc-500 text-xs font-normal">
            생성일 {(createTime && dayjs(createTime.value).format("YYYY. MM. DD")) || ""}
          </div>
        }
      </div>
    </Link>
  )
}

export default CreateTemplateItem