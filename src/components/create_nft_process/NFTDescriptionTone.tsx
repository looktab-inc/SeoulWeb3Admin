import Tag from "@/components/Tag";
import ChatMessageByAdmin from "@/components/create_nft_process/ChatMessageByAdmin";
import {TONES} from "@/util/statics/data";
import {SelectedType} from "@/util/types/types";
import useCustom from "@/hooks/useCustom";

const NFTDescriptionTone = () => {
  const chat = useCustom()
  const onClick = (tone: SelectedType) => {
    chat.setNFTDescriptionTone(tone)
  }

  return (
    <ChatMessageByAdmin text={""}>
      <div className="w-[480px] p-[24px] bg-white rounded-2xl border border-zinc-400 text-zinc-800">
        <div className="text-[22px] font-bold">NFT 설명 말투 선택</div>
        <div className="text-[16px] font-medium">사용자 앱에서 보여질 문구 작성하실 때 원하시는 분위기의 말투를 선택해주세요.</div>
        <div className="justify-start items-start gap-3 inline-flex mt-[20px]">
          {
            TONES.map((item, index) => {
              const tone = chat.getCrateInfo('tone')
              return <Tag
                key={index}
                text={item.title}
                onClick={() => {onClick(item)}}
                selected={tone === item.type}
                value={item.type}
              />
            })
          }
        </div>
      </div>
    </ChatMessageByAdmin>
  )
}

export default NFTDescriptionTone