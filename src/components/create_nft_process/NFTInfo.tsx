import ChatMessageByAdmin from "@/components/create_nft_process/ChatMessageByAdmin";
import Image from "next/image";

const NFTInfo = () => {
  return (
    <>
      <ChatMessageByAdmin
        text={'지갑에 씨앗 NFT가 에어드랍 되었습니다.'}
        childrenInBubble={
        <div className={""}>
        <div className={"w-[120px] h-[120px] relative mt-2"}>
          <Image src={'/images/references/seed.png'} alt={'seed image'} fill className={"rounded-2xl"}/>
        </div></div>}
      >
      </ChatMessageByAdmin>
      <ChatMessageByAdmin
        text={ '10,000보를 걸었습니다! 100 CO2 배출권을 적립해드렸어요.'}
      >
      </ChatMessageByAdmin>
    </>
  )
}

export default NFTInfo