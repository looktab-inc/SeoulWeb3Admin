
import ChatMessageByAdmin from "@/components/create_nft_process/ChatMessageByAdmin";
import useCustom from "@/hooks/useCustom";

const CreateNFTCollection = () => {
  const custom = useCustom()
  return (
    <ChatMessageByAdmin text={``}>
      <button
        className="px-5 py-2.5 bg-green-500 rounded-xl"
        onClick={custom.createNFTCollection}
      >
        <div className="text-white text-base font-bold">NFT 발급</div>
      </button>
    </ChatMessageByAdmin>
  )
}

export default CreateNFTCollection