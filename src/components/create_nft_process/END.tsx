import Link from "next/link";
import ChatMessageByAdmin from "@/components/create_nft_process/ChatMessageByAdmin";

const EndCreateNFT = () => {
  return (
    <ChatMessageByAdmin text={``}>
      <div className="w-[481px] p-5 bg-white rounded-tr-[25px] rounded-bl-[25px] rounded-br-[25px] border border-zinc-300 justify-center items-center gap-[9px]">
        <div>
          발행이 완료되었습니다.
        </div>
        <div className="text-zinc-800 text-base font-bold">
          메인으로 돌아가 발행현황을 확인보세요!
        </div>
      </div>
      <Link
        href={'/home'}
        className="px-5 py-2.5 bg-green-500 rounded-xl"
      >
        <div className="text-white text-base font-bold">메인으로 돌아가기</div>
      </Link>
    </ChatMessageByAdmin>
  )
}

export default EndCreateNFT