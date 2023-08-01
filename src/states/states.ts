// @ts-nocheck
import {atom, selector} from "recoil";
import {AccountType, ChatType, CreateNFTType, NFTType, SetCreateNFTType} from "@/util/types/types";
import {CreateNFTStep, MessageTemplateType} from "@/util/enums/enum";

// setSelf 함수 초기화값 지정, onSet 함수는 값이 변경될 때마다 값을 동기화
// @ts-ignore
const localStorageEffect = (key) => ({setSelf, onSet}) => {
  const customLocalStorage = typeof window !== 'undefined' ? window.localStorage : null
  const savedValue = customLocalStorage?.getItem(key)
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }
  onSet((newValue, _, isReset) => {
    if (isReset) {
      customLocalStorage?.removeItem(key)
    } else {
      customLocalStorage?.setItem(key, JSON.stringify(newValue));
    }
  });
}

/**
 * 유저 정보
 */
export const accountState = atom<AccountType>({
  key: 'accountState',
  default: {
    address: '',
    loggedIn: false
  },
  effects: [localStorageEffect('user')]
})

export const accountSelector = selector({
  key: 'accountSelector',
  get: ({get}) => get(accountState),
  set: ({get, set, reset}, account : AccountType | null) => {
    if (!account) {
      reset(accountState)
    } else {
      set(accountState, account)
    }
  }
})

/**
 * nft 생성 정보
 */
export const createNTFState = atom<CreateNFTType>({
  key: 'createNTFState',
  default: {
    step: CreateNFTStep.step1,
    nftTitle: '',
    nftDescription:'',
    tone: '',
    nftImage: '',
    seed: '',
    seedType: ''
  }
})

export const createNTFSelector = selector<CreateNFTType, SetCreateNFTType>({
  key: 'createNTFSelector',
  get: ({get}) => get(createNTFState),
  set: ({get, set, reset}, newValue: SetCreateNFTType | null) => {
    if (newValue === null) {
      reset(chatListState)
    } else {
      set(createNTFState,
        (oldChatListState) => ({
          ...oldChatListState,
          [`${newValue.key}`] : newValue.value
        })
      )
    }
  },
})

/**
 * 현재 탬플릿
 */
export const currentTemplateState = atom<string>({
  key: 'currentTemplateState',
  default: MessageTemplateType.NFT_TITLE
})

export const currentTemplateSelector = selector<string, string|null>({
  key: 'currentTemplateSelector',
  get: ({get}) => get(currentTemplateState),
  set: ({set, reset}, newTemplate: string | null) => {
    if (newTemplate === null) {
      reset(currentTemplateState)
    } else {
      set(currentTemplateState, newTemplate);
    }
  },
})

/**
 * 채팅 리스트
 */
export const chatListState = atom<ChatType[]>({
  key: 'chatListState',
  default: [
    {
      template: MessageTemplateType.NFT_TITLE,
      text: '',
      imageURL: '',
    }
  ]
})

export const chatListSelector = selector<ChatType[], ChatType|null>({
  key: 'chatListSelector',
  get: ({get}) => get(chatListState),
  set: ({set, reset}, newChatItem: ChatType | null) => {
    if (newChatItem === null) {
      reset(chatListState)
    } else {
      set(chatListState, (oldChatListState) => [...oldChatListState, newChatItem]);
    }
  },
})

/**
 * 채팅 리스트
 */
export const mobileChatListState = atom<ChatType[]>({
  key: 'mobileChatListState',
  default: [
    {
      template: MessageTemplateType.NFT_INFO,
      text: '',
      imageURL: '',
    }
  ]
})

export const mobileChatListSelector = selector<ChatType[], ChatType|null>({
  key: 'mobileChatListSelector',
  get: ({get}) => get(mobileChatListState),
  set: ({set, reset}, newChatItem: ChatType | null) => {
    if (newChatItem === null) {
      reset(mobileChatListState)
    } else {
      set(mobileChatListState, (oldChatListState) => [...oldChatListState, newChatItem]);
    }
  },
})

/**
 * 현재 탬플릿
 */
export const mobileCurrentTemplateState = atom<string>({
  key: 'mobileCurrentTemplateState',
  default: MessageTemplateType.NFT_INFO
})

export const mobileCurrentTemplateSelector = selector<string, string|null>({
  key: 'mobileCurrentTemplateSelector',
  get: ({get}) => get(mobileCurrentTemplateState),
  set: ({set, reset}, newTemplate: string | null) => {
    if (newTemplate === null) {
      reset(mobileCurrentTemplateState)
    } else {
      set(mobileCurrentTemplateState, newTemplate);
    }
  },
})


/**
 * nft 리스트
 */
export const NFTListState = atom<NFTType[]>({
  key: 'NFTListState',
  default: [],
  effects: [localStorageEffect('nftList')]
})
