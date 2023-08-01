import ChatMessageByAdmin from "@/components/create_nft_process/ChatMessageByAdmin";

const NFTTitle = () => {
  return (
    <ChatMessageByAdmin text={'고객에게 전달할 NFT를 만들 시간입니다! 아래 입력폼들을 순서대로 채워주세요.'}>
      <div className="w-[480px] p-[24px] bg-white rounded-2xl border border-zinc-400">
        <div className="text-zinc-800 text-[22px] font-bold mb-[20px]">NFT 타이틀</div>
        <div className="w-full px-5 py-4 rounded-2xl border border-zinc-400">
          <div className="grow shrink basis-0 text-[#27272A] text-[16px] font-medium">타이틀을 입력해주세요.</div>
        </div>
      </div>
    </ChatMessageByAdmin>
  )
}

export default NFTTitle