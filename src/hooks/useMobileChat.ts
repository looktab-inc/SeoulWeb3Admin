// @ts-nocheck
import {useRecoilState} from "recoil";
import {mobileChatListSelector, mobileCurrentTemplateSelector} from "@/states/states";
import {ChatType} from "@/util/types/types";
import {MessageTemplateType} from "@/util/enums/enum";

const useMoblieChat = () => {
  const [chatList, setChatList] = useRecoilState(mobileChatListSelector)
  const [currentTemplate, setCurrentTemplate] = useRecoilState(mobileCurrentTemplateSelector)

  const getChatList = () => {
    return chatList
  }

  const addChat = (newChat: ChatType) => {
    setChatList(newChat)
    if (currentTemplate === MessageTemplateType.NFT_INFO) {
      setChatList({
        template: MessageTemplateType.DEFAULT_BY_ADMIN,
        text: '지갑에 씨앗 NFT가 에어드랍 되었습니다.'
      })
    }
  }

  return {
    getChatList,
    addChat
  }
}

export default useMoblieChat