"use client"

import {useEffect, useRef} from "react";
import {MessageTemplateType} from "@/util/enums/enum";
import ChatMessage from "@/components/create_nft_process/ChatMessage";
import ChatMessageByAdmin from "@/components/create_nft_process/ChatMessageByAdmin";
import NFTTitle from "@/components/create_nft_process/NFTTitle";
import NFTDescriptionTone from "@/components/create_nft_process/NFTDescriptionTone";
import NFTDescription from "@/components/create_nft_process/NFTDescription";
import NFTImage from "@/components/create_nft_process/NFTImage";
import NFTSeed from "@/components/create_nft_process/NFTSeed";
import END from "@/components/create_nft_process/END";
import useCustom from "@/hooks/useCustom";
import Create from "@/components/create_nft_process/Create";

const ChatList = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const chat = useCustom()

  useEffect(() => {
    if (scrollRef.current) {
      // @ts-ignore
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chat.getChatList()])

  return (
    <div className={'overflow-y-auto w-full'}>
      <div className={'w-[600px] mt-0 mx-auto pt-[48px]'} id="chatList" >
        {
          chat.getChatList().map((item, index) => {
            if (item.template === MessageTemplateType.DEFAULT) {
              return <ChatMessage key={index} text={item.text || ""} imageURL={item.imageURL || ""}/>
            } else if (item.template === MessageTemplateType.DEFAULT_BY_ADMIN) {
              return <ChatMessageByAdmin key={index} text={item.text as string}/>
            } else if (item.template === MessageTemplateType.NFT_TITLE) {
              return <NFTTitle key={index}/>
            } else if (item.template === MessageTemplateType.NFT_DESCRIPTION) {
              return <NFTDescription key={index}/>
            } else if (item.template === MessageTemplateType.NFT_DESCRIPTION_TONE) {
              return <NFTDescriptionTone key={index}/>
            } else if (item.template === MessageTemplateType.NFT_IMAGE) {
              return <NFTImage key={index}/>
            } else if (item.template === MessageTemplateType.SEED) {
              return <NFTSeed key={index}/>
            } else if (item.template === MessageTemplateType.END) {
              return <END key={index}/>
            } else if (item.template === MessageTemplateType.GENERATE_NFT) {
              return <Create key={index}/>
            }
          })
        }
      </div>
      <div className="h-32 md:h-48 flex-shrink-0" ref={scrollRef}></div>
    </div>
  )
}

export default ChatList