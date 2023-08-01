
import Tag from "@/components/Tag";
import ChatMessageByAdmin from "@/components/create_nft_process/ChatMessageByAdmin";
import {SEEDS, TONES} from "@/util/statics/data";
import {SelectedType} from "@/util/types/types";
import useCustom from "@/hooks/useCustom";

const NFTSeed = () => {
  const custom = useCustom()
  const onClick = (seed: SelectedType) => {
    custom.setNFTSeed(seed)
  }

  return (
    <ChatMessageByAdmin text={""}>
      <div className="w-[480px] p-[24px] bg-white rounded-2xl border border-zinc-400 text-zinc-800">
        <div className="text-[22px] font-bold">씨앗 종류 선택</div>
        <div className="text-[16px] font-medium">
          사용자에게 발급될 NFT의 종류를 선택해주세요.<br/>
          씨앗 종류별로 단계가 다릅니다.
        </div>
        <div className="justify-start items-start gap-3 inline-flex mt-[20px] flex-col flex">
          {
            SEEDS.map((item, index) => {
              const seed = custom.getCrateInfo('seed')
              return <Tag
                key={index}
                text={item.title}
                onClick={() => {onClick(item)}}
                selected={seed === item.type}
                value={item.type}
              />
            })
          }
        </div>
      </div>
    </ChatMessageByAdmin>
  )
}

export default NFTSeed