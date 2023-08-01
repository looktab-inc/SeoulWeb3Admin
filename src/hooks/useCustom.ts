import {useRecoilState} from "recoil";
import {accountSelector, chatListSelector, createNTFSelector, currentTemplateSelector} from "@/states/states";
import {ChatType, SelectedType} from "@/util/types/types";
import {CreateNFTStep, MessageTemplateType} from "@/util/enums/enum";
import {SEEDS, TONES} from "@/util/statics/data";
import AIHelper from "@/util/externals/ai/client";
import SolanaHelper from "@/util/externals/blockchain/solanaHelper";
import StorageByWeb3 from "@/util/externals/storage/web3";

const useCustom = () => {
  const [account, setAccountInfo] = useRecoilState(accountSelector)
  const [chatList, setChatList] = useRecoilState(chatListSelector)
  const [currentTemplate, setCurrentTemplate] = useRecoilState(currentTemplateSelector)
  const [createNFT, setCreateNFT] = useRecoilState(createNTFSelector)
  const customLocalStorage = typeof window !== 'undefined' ? window.localStorage : null

  // @ts-ignore
  const isPhantomInstalled = customLocalStorage?.phantom?.solana?.isPhantom

  const solanaHelper = new SolanaHelper()
  const storageByWeb3 = new StorageByWeb3()

  const getChatList = () => {
    return chatList
  }

  const getCurrentTemplate = () => {
    return currentTemplate
  }

  const getCrateInfo = (key: string) => {
    return createNFT[key]
  }

  const setCreateInfo = (key, value) => {
    setCreateNFT({
      key : key,
      value: value
    })
  }

  const setNFTDescriptionTone = (selectedType: SelectedType) => {
    addChat({
      template: MessageTemplateType.DEFAULT,
      text: TONES.filter(item => item.type === selectedType.type)[0].title
    })
    setCreateInfo('tone', selectedType.type)
    setCurrentTemplate(MessageTemplateType.NFT_DESCRIPTION)
    addChat({
      template: MessageTemplateType.NFT_DESCRIPTION,
      text: ''
    })
  }

  const setNFTSeed = async (selectedType: SelectedType) => {
    setChatList({
      template: MessageTemplateType.DEFAULT,
      text: SEEDS.filter(item => item.type === selectedType.type)[0].title
    })
    setCreateInfo('seed', selectedType.type)
    setChatList({
      template: MessageTemplateType.GENERATE_NFT,
      text: ''
    })
  }

  const createNFTCollection  = async () => {
    setChatList({
      template: MessageTemplateType.DEFAULT_BY_ADMIN,
      text: 'NFT를 발행 중입니다. \n 시간이 조금 걸립니다. 잠시만 기다려 주세요!'
    })
    const newAttributes = [
      { trait_type: 'store_address', value: account?.address },
      { trait_type: 'seed', value: createNFT.seed },
    ]
    const imageURL = await storageByWeb3.getImage(createNFT.nftImage)
    fetch('/collection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: createNFT.nftTitle,
        description: createNFT.nftDescription,
        imageUri: imageURL as string,
        attributes: newAttributes
      }),
    })
      .then(response => response.json())

  }

  const setNFTImageByURL = (imageURL) => {
    setCreateInfo('nftImage', imageURL)
    setChatList({
      template: MessageTemplateType.DEFAULT,
      text: '',
      imageURL: imageURL
    })
    setChatList({
      template: MessageTemplateType.DEFAULT_BY_ADMIN,
      text: '이미지를 선택해주셨군요! 감사합니다 :)'
    })
    setChatList({
      template: MessageTemplateType.SEED,
      text: ''
    })
    setCurrentTemplate(MessageTemplateType.SEED)
  }

  const setNFTImageByFile = (imageURL) => {
    setCreateInfo('nftImage', imageURL)
    setChatList({
      template: MessageTemplateType.DEFAULT_BY_ADMIN,
      text: '이미지를 전달해주셨군요! 감사합니다 :)'
    })
    setChatList({
      template: MessageTemplateType.SEED,
      text: ''
    })
    setCurrentTemplate(MessageTemplateType.SEED)
  }

  const addChat = (newChat: ChatType) => {
    setChatList(newChat)
    if(currentTemplate === MessageTemplateType.NFT_TITLE) {
      setCreateInfo('nftTitle', newChat.text)
      setChatList({
        template: MessageTemplateType.NFT_DESCRIPTION_TONE,
      })
      setCurrentTemplate(MessageTemplateType.NFT_DESCRIPTION_TONE)
    } else if(currentTemplate === MessageTemplateType.NFT_DESCRIPTION) {
      setChatList({
        template: MessageTemplateType.DEFAULT_BY_ADMIN,
        text: '시간이 조금 걸립니다. 잠시만 기다려 주세요!'
      })
      const aiHelper = new AIHelper()
      aiHelper.makeText(newChat.text!!, createNFT.tone)
        .then(result => {
          // API 호출 결과값(result)을 사용하는 로직 작성
          setCreateInfo('nftDescription', result.replace(/(\n\s*)+/g, "\n\n") as string)
          setChatList({
            template: MessageTemplateType.DEFAULT_BY_ADMIN,
            text: result as string
          })
          setCurrentTemplate(MessageTemplateType.NFT_IMAGE)
          setChatList({
            template: MessageTemplateType.NFT_IMAGE,
          })
        })
        .catch(error => {
          // 에러 처리
          console.error(error);
        });
    }
  }
  const connectWallet = async () => {
    return new Promise(async (resolve, reject) => {
      const provider = getWalletProvider()
      if (provider) {
        const resp = await provider?.connect()
        setAccountInfo(prev => ({
          ...prev,
          address: resp.publicKey.toString(),
          loggedIn: true
        }))
        return resolve(resp.publicKey.toString())
      }

      return reject('failed connecting wallet')
    })
  }

  const getWalletProvider = () => {
    if (!isPhantomInstalled) {
      window.open('https://phantom.app/', '_blank');
    }

    if ('phantom' in window) {
      const provider = (window as any).solana
      if (provider?.isPhantom) {
        return provider
      }
    }
    return false
  }

  const disconnectWallet = () => {
    setAccountInfo(null)
  }

  const getAccount = () => {
    return account
  }

  const isLoggedIn = () => {
    return account?.loggedIn
  }

  const getCreateNFTInfo = () => {
    return createNFT
  }

  return {
    getChatList,
    addChat,
    getCurrentTemplate,
    setCreateInfo,
    getCrateInfo,
    setCurrentTemplate,
    setNFTDescriptionTone,
    setNFTImageByURL,
    setNFTImageByFile,
    setNFTSeed,
    getAccount,
    isLoggedIn,
    getCreateNFTInfo,
    connectWallet,
    disconnectWallet,
    createNFTCollection
  }
}

export default useCustom