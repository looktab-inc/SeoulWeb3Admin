import ChatMessageByAdmin from "@/components/create_nft_process/ChatMessageByAdmin";

const NFTDescription = () => {
  return (
    <ChatMessageByAdmin text={''}>
      <div className="w-[480px] p-[24px] p-6 bg-white rounded-2xl border border-zinc-400 text-zinc-800">
        <div className="text-[22px] font-bold">NFT 설명 (포인트 획득 안내)</div>
        <div className="text-[16px] font-medium">
          NFT에 필요한 설명을 편하게 적어주세요.<br/>
          <b>자동으로 문장을 작성</b>해드려요.
        </div>
        <ul className="text-[14px] font-medium mt-[4px] list-disc pl-[1em]">
          <li className={"list-disc"}>
            이미지가 필요한 경우 <b>"이미지"</b> , <b>"캡쳐"</b> 또는 <b>"사진"</b>  단어를 포함해주세요.
          </li>
          <li className={"list-disc"}>
            사용자의 걸음 기반 탄소배출권 적립은 '걸음' 단어를 포함해주세요.
          </li>
          <li className={"list-disc"}>
            보상은 <b>"포인트"</b> 또는 <b>"탄소배출권"</b> 단어를 포함해주세요.
          </li>
        </ul>
        <div className={"w-full text-zinc-500 text-sm font-medium mt-[4px] bg-[#D4D4D8] p-2 rounded-md"}>
          예시) 유저가 포인트를 획득하는 방법 <br/>
          모바일 영수증 캡쳐 사진 인증 시 10포인트 <br/>
          다회용기 사용 사진 인증 시 100포인트 <br/>
          100 걸음 당 1co2 탄소배출권 적립 <br/>
        </div>
      </div>
    </ChatMessageByAdmin>
  )
}

export default NFTDescription