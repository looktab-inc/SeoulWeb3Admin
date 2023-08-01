// @ts-nocheck
import {useRecoilState} from "recoil";
import {accountSelector, chatListSelector, createNTFSelector, currentTemplateSelector} from "@/states/states";
import {ChatType, SelectedType} from "@/util/types/types";
import {CreateNFTStep, MessageTemplateType, SEED} from "@/util/enums/enum";
import {FLOWERS, GRAINS, SEEDS, TONES} from "@/util/statics/data";
import AIHelper from "@/util/externals/ai/client";
import StorageByWeb3 from "@/util/externals/storage/web3";
import dayjs from "dayjs";

const useCustom = () => {
  const [account, setAccountInfo] = useRecoilState(accountSelector)
  const [chatList, setChatList] = useRecoilState(chatListSelector)
  const [currentTemplate, setCurrentTemplate] = useRecoilState(currentTemplateSelector)
  const [createNFT, setCreateNFT] = useRecoilState(createNTFSelector)
  const customLocalStorage = typeof window !== 'undefined' ? window.localStorage : null

  // @ts-ignore
  const isPhantomInstalled = customLocalStorage?.phantom?.solana?.isPhantom

  const getChatList = () => {
    return chatList
  }

  const getCurrentTemplate = () => {
    return currentTemplate
  }

  const getCrateInfo = (key: string) => {
    // @ts-ignore
    return createNFT[key]
  }

  // @ts-ignore
  const setCreateInfo = (key, value) => {
    // @ts-ignore
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

  function getRandomNumber(count) {
    return Math.floor(Math.random() * count); // 0, 1, 2, 3 중 하나의 값 반환
  }


  const setNFTSeed = async (selectedType: SelectedType) => {
    setChatList({
      template: MessageTemplateType.DEFAULT,
      text: SEEDS.filter(item => item.type === selectedType.type)[0].title
    })
    let seedText = ''
    if (selectedType.type === SEED.TREE) {
      seedText = FLOWERS[getRandomNumber(3)]
    } else if(selectedType.type  === SEED.FLOWER) {
      seedText = FLOWERS[getRandomNumber(2)]
    } else {
      seedText = GRAINS[0]
    }

    setCreateInfo('seedType', seedText)
    setCreateInfo('seed', selectedType.type)
    setChatList({
      template: MessageTemplateType.NFT_DESCRIPTION_TONE,
      text: ''
    })
  }

  function removeNewlines(inputString) {
    return inputString.replace(/\n/g, '');
  }

  const createNFTCollection  = async () => {
    setChatList({
      template: MessageTemplateType.DEFAULT_BY_ADMIN,
      text: 'NFT를 발행 중입니다. \n 시간이 조금 걸립니다. 잠시만 기다려 주세요!'
    })
    const newAttributes = [
      { trait_type: 'store_address', value: account?.address },
      { trait_type: 'seed', value: createNFT.seed },
      { trait_type: 'seed_type', value: createNFT.seedType },
      { trait_type: 'level', value: -1 },
      { trait_type: 'certification', value: 'all' },
      { trait_type: 'cover_image', value: createNFT.nftImage},
      { trait_type: 'created_time', value: dayjs() },
    ]
    fetch('/api/collection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: removeNewlines(createNFT.nftTitle),
        description: removeNewlines(createNFT.nftDescription),
        imageUri: createNFT.nftImage as string,
        attributes: newAttributes
      }),
    }).then(response => response.json())
      .then(response => {
        console.log(response)
        setChatList({
          template: MessageTemplateType.END,
          text: ''
        })
      })

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
      template: MessageTemplateType.GENERATE_NFT,
      text: ''
    })
    setCurrentTemplate(MessageTemplateType.GENERATE_NFT)
  }

  const setNFTImageByFile = (imageURL) => {
    setCreateInfo('nftImage', imageURL)
    setChatList({
      template: MessageTemplateType.DEFAULT_BY_ADMIN,
      text: '이미지를 전달해주셨군요! 감사합니다 :)'
    })
    setChatList({
      template: MessageTemplateType.GENERATE_NFT,
      text: ''
    })
    setCurrentTemplate(MessageTemplateType.GENERATE_NFT)
  }

  const addChat = (newChat: ChatType) => {
    setChatList(newChat)
    if(currentTemplate === MessageTemplateType.NFT_TITLE) {
      setCreateInfo('nftTitle', newChat.text)
      setChatList({
        template: MessageTemplateType.SEED,
      })
      setCurrentTemplate(MessageTemplateType.SEED)
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

  const getAddress = () => {
    return account?.address
  }


  const isLoggedIn = () => {
    return account?.loggedIn
  }

  const getCreateNFTInfo = () => {
    return createNFT
  }

  const resetChatList = () => {
    setChatList(null)
    setCurrentTemplate(null)
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
    createNFTCollection,
    getAddress,
    resetChatList
  }
}

export default useCustom