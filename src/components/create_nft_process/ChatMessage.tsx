import Image from "next/image";

type ChatMessageProps = {
  text: string;
  imageURL: string;
}

const ChatMessage = ({text, imageURL} : ChatMessageProps) => {
  return (
    <li className={'w-full  mb-[40px]'}>
      <div className="self-stretch flex-col justify-center items-end flex w-full">
        <div className="w-auto p-5 bg-zinc-900 rounded-tl-[25px] rounded-bl-[25px] rounded-br-[25px] justify-center items-center gap-[9px] inline-flex">
          <div className="grow shrink basis-0 text-white text-[16px] font-bold whitespace-pre-line">
            {text}
            {
              imageURL &&
              <div
                className={"relative h-[120px] w-[120px]"}
              >
                <Image
                  src={imageURL}
                  alt={'image'}
                  className={'rounded-2xl border border border border border-zinc-200'}
                  fill
                />
              </div>
            }
          </div>
        </div>
      </div>
    </li>
  )
}

export default ChatMessage