import {atom, selector} from "recoil";
import {AccountType, ChatType, CreateNFTType, NFTType, SearchLocationType, SetCreateNFTType} from "@/util/types/types";
import {CreateNFTStep, MessageTemplateType} from "@/util/enums/enum";

// setSelf 함수 초기화값 지정, onSet 함수는 값이 변경될 때마다 값을 동기화
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
    currentTemplate: MessageTemplateType.SELECTED_EVENT,
    selectedEventTemplate: '',
    selectedCollectInformation: '',
    nftTitle: '',
    nftDescription:'',
    tone: '',
    nftImage: '',
    numberOfIssue: 0,
    enterCode: '',
    startDateTime: 0,
    endDateTime: 0,
    collectInformationDescription: "",
    displayAppComment: '',
  }
})

export const createNTFSelector = selector<CreateNFTType, SetCreateNFTType>({
  key: 'createNTFSelector',
  get: ({get}) => get(createNTFState),
  set: ({get, set}, newValue: SetCreateNFTType | null) => {
    if (newValue === null) {
      set(createNTFState,  {
        step: CreateNFTStep.step1,
        currentTemplate: MessageTemplateType.SELECTED_EVENT,
        selectedEventTemplate: '',
        selectedCollectInformation: '',
        nftTitle: '',
        nftDescription:'',
        tone: '',
        nftImage: '',
        numberOfIssue: 0,
        enterCode: '',
        startDateTime: 0,
        endDateTime: 0,
        collectInformationDescription: "",
        displayAppComment: '',
      });
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


export const searchLocation = atom<SearchLocationType>({
  key: 'searchLocation',
  default: {
    country: '',
    address: '',
    range: 0,
    longitude: 0,
    latitude: 0,
  }
})


/**
 * 채팅 리스트
 */
export const chatListState = atom<ChatType[]>({
  key: 'chatListState',
  default: [
    {
      template: MessageTemplateType.SELECTED_EVENT,
      text: '',
      imageURL: '',
    }
  ]
})

export const chatListSelector = selector<ChatType[], ChatType|null>({
  key: 'chatListSelector',
  get: ({get}) => get(chatListState),
  set: ({set}, newChatItem: ChatType | null) => {
    if (newChatItem === null) {
      set(chatListState,  [
        {
          template: MessageTemplateType.SELECTED_EVENT,
          text: '',
          imageURL: '',
        }
      ]);
    } else {
      set(chatListState, (oldChatListState) => [...oldChatListState, newChatItem]);
    }
  },
})

/**
 * 채팅 리스트
 */
export const NFTListState = atom<NFTType[]>({
  key: 'NFTListState',
  default: [],
  effects: [localStorageEffect('nftList')]
})
