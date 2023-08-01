// @ts-nocheck
import {useCallback, useRef, useState} from "react";
import Image from "next/image";

import AIHelper from "@/util/externals/ai/client";
import ChatMessageByAdmin from "@/components/create_nft_process/ChatMessageByAdmin";
import StorageByWeb3 from "@/util/externals/storage/web3";
import useCustom from "@/hooks/useCustom";
import {MessageTemplateType} from "@/util/enums/enum";

const NFTImage = () => {
  const custom = useCustom()
  const [images, setImages] = useState([])
  const [file, setFile] = useState()
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);

  const handleClickMakeImage = async () => {
    custom.addChat({
      template: MessageTemplateType.DEFAULT_BY_ADMIN,
      text: 'AI가 이미지를 생성 중입니다.\n 시간이 조금 걸립니다. 잠시만 기다려 주세요!'
    })
    const aiHelper = new AIHelper()
    aiHelper.makeImage(custom.getCrateInfo('nftDescription') as string)
      .then(result => {
        // @ts-ignore
        setImages(result)
      })
      .catch(error => {
        // 에러 처리
        console.error(error);
      });
  }

  const uploadIPFSByBase64 = (imageURL: string) => {
    if (custom.getCrateInfo('nftImage')) {
      return
    }
    custom.addChat({
      template: MessageTemplateType.DEFAULT_BY_ADMIN,
      text: '시간이 조금 걸립니다. 잠시만 기다려 주세요!'
    })
    const storageByWeb3 = new StorageByWeb3()
    storageByWeb3.uploadByBase64(imageURL, custom.getAccount() as string)
      .then(result => {
        custom.setNFTImageByURL(result as string)
      }).catch(e => {
        console.log(e)
    })
  }

  const handleFileSelect = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file)
      nextStep(e.target.files)
    }
  }, []);

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setFile(file)
      nextStep(e.dataTransfer.files)
    }
  }, []);

  const handleClickUpload = () => {
    // @ts-ignore
    dragRef.current.querySelector('#uploadImage').click()
  }

  const handleClickDelete = () => {
    setFile(null)
  }

  const nextStep = (files) => {
    custom.addChat({
      template: MessageTemplateType.DEFAULT_BY_ADMIN,
      text: '이미지를 최적화 하는 중입니다. \n 시간이 조금 걸립니다. 잠시만 기다려 주세요!'
    })
    const storageByWeb3 = new StorageByWeb3()
    const fileName = `${custom.getAccount()?.address}-${Date.now()}`
    storageByWeb3.uploadFile(files, fileName)
      .then(result => {
        custom.setNFTImageByFile(result)
      }).catch(e => console.log(e))
  }

  return (
    <ChatMessageByAdmin text={''} withImage={true}>
      <div className="w-[480px] p-6 bg-white rounded-2xl border border-zinc-400 flex-col justify-start items-start gap-5 inline-flex">
        <div className="flex-col justify-start items-start gap-1 flex">
          <div className="text-zinc-800 text-[22px] font-bold">NFT 이미지</div>
          <div className="text-zinc-800 text-[16px] font-medium">
            NFT 설명을 반영해서 자동으로 이미지를 생성해드려요. <br/>
            아래 버튼을 눌러주세요!
          </div>
        </div>
        <div
          ref={dragRef}
          onDrop={handleDrop}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDragOver}
          onClick={handleClickUpload}
          className="px-10 py-5 rounded-2xl border border-zinc-400 w-full text-center"
        >
          <div className="w-[40px] h-[40px] relative mx-auto my-0">
            <Image src={"/images/icons/icon-upload.webp?1"} alt={'upload image'} fill/>
          </div>
          <div className="w-full">
            <input
              id="uploadImage"
              type="file"
              onChange={handleFileSelect}
              className={'hidden'}
            />
            <div className="flex-col justify-center items-center flex">
              <div className="text-zinc-800 text-[14px] font-medium">파일을 마우스로 끌어오거나,</div>
              <div className="justify-start items-start inline-flex">
                <div className="text-green-500 text-[14px] font-medium underline mr-[5px]">파일을 선택</div>
                <div className="text-zinc-800 text-[14px] font-medium">해주세요.</div>
              </div>
            </div>
          </div>
        </div>
        {
          file &&
          <div className="w-[432px] p-3 bg-zinc-100 rounded-xl relative">
            <div className="justify-start items-center gap-3 flex ">
              <div className="w-10 h-10 relative rounded-md relative">
                <Image src={URL.createObjectURL(file)} alt={'upload file image'} fill/>
              </div>
              <div className="flex-col justify-start items-start inline-flex">
                <div className="text-zinc-800 text-sm font-medium">{file.name}</div>
                <div className="text-zinc-500 text-xs font-normal">{(file.size / 1024).toFixed(2)} KB</div>
              </div>
            </div>
            <button
              className="top-[24px] right-[24px] absolute"
              onClick={handleClickDelete}
            >
              <Image src={'/images/icons/icon-delete.webp'} alt={'delete upload file'} width={16} height={16}/>
            </button>
          </div>
        }
        <button
          className="w-full h-14 px-5 py-2.5 bg-green-500 rounded-xl" onClick={handleClickMakeImage}>
          <div className="text-white text-[16px] font-bold">AI로 생성하기</div>
        </button>
      </div>
      {
        images && images.length > 0 &&
        <div className="w-[480px] h-[221px] p-6 bg-white rounded-2xl border border border border border-zinc-400 flex-col justify-start items-start gap-5 inline-flex">
          <div className="text-zinc-800 text-[22px] font-bold">마음에 드는 이미지를 선택해주세요!</div>
          <div className="justify-start items-start gap-3 inline-flex">
            {
              images.map((image, index) => {
                return (
                  <button
                    key={index}
                    className={"relative h-[120px] w-[120px]"}
                    onClick={() => {uploadIPFSByBase64(image)}}
                  >
                    <Image
                      src={image}
                      alt={'image'}
                      className={'rounded-2xl border border border border border-zinc-200'}
                      fill
                    />
                  </button>
                )
              })
            }
          </div>
        </div>
      }
    </ChatMessageByAdmin>
  )
}

export default NFTImage