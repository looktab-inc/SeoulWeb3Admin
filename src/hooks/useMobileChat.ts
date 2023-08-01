// @ts-nocheck
import {useRecoilState} from "recoil";
import {mobileChatListSelector, mobileCurrentTemplateSelector} from "@/states/states";
import {ChatType} from "@/util/types/types";
import {MessageTemplateType} from "@/util/enums/enum";
import {INFO_TEXT_1, INFO_TEXT_2} from "@/util/statics/data";

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
        text: INFO_TEXT_1
      })
      setChatList({
        template: MessageTemplateType.DEFAULT_BY_ADMIN,
        text: INFO_TEXT_2
      })
    }
  }

  const resetChatList = () => {
    setChatList(null)
    setCurrentTemplate(null)
  }

  return {
    getChatList,
    addChat,
    resetChatList
  }
}

export default useMoblieChat