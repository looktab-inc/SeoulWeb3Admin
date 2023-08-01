
import Image from "next/image";
import {NFTType} from "@/util/types/types";
import dayjs from "dayjs";

const AllCreateTemplateItem = ({nft}: {nft: NFTType}) => {
  const createTime = nft.attributes.find(attribute => attribute.trait_type === 'created_time')
  const image = nft.attributes.find(attribute => attribute.trait_type === 'cover_image')
  return (
    <div className="w-[200px] h-[310px] px-4 pb-5 bg-zinc-100 rounded-2xl flex-col justify-start items-center gap-3 inline-flex">
      <div className="w-[203px] h-[203px] relative">
        {
          image &&
          <Image className="w-[203px] h-[203px] rounded-lg"
                 src={image.value} fill alt={'nft image'}
          />
        }
      </div>
      <div className="w-[174px] flex-col justify-start items-center gap-0.5 flex">
        <div className="text-black text-base font-bold">{nft.name}</div>
        {
          createTime  &&
          <div className="text-zinc-500 text-xs font-normal">
            생성일시 {(createTime && dayjs(createTime.value).format("YYYY. MM. DD")) || ""}
          </div>
        }
      </div>
      <div className="w-[177px] text-right text-zinc-600 text-xs font-normal">100개 발급</div>
    </div>
  )
}

export default AllCreateTemplateItem