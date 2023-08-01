import Image from "next/image";
import {ReactNode} from "react";

type ChatMessageByAdminProps = {
  text: string;
  withImage?: boolean;
  children?: ReactNode;
  childrenInBubble?: ReactNode;
}

const ChatMessageByAdmin = ({text, children, childrenInBubble, withImage = true} : ChatMessageByAdminProps) => {
  return (
    <div className={`w-full ${withImage? 'mb-[40px]' : ''}`}>
      <div className="self-stretch justify-start items-start inline-flex">
        {
          withImage &&
          <div className="w-[32px] h-[32px] lg:w-16 lg:h-[64px] flex-col justify-center items-center inline-flex mr-[16px]">
            <div className="w-[32px] h-[32px] lg:w-16 lg:h-[64px] flex-col justify-center items-center inline-flex relative">
              <Image src={'/images/profiles/admin-profile.webp?q'} alt={'어드민'} fill/>
            </div>
          </div>
        }
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
          {
            text &&
            <div className="self-stretch flex-col justify-center items-start flex w-full">
              <div className="w-max-[600px] w-auto p-[20px] bg-white rounded-tr-[25px] rounded-bl-[25px] rounded-br-[25px] border border-zinc-300 gap-[9px]">
                <div className="text-zinc-800 text-[16px] font-bold whitespace-pre-line">
                  {text}
                </div>
                {childrenInBubble}
              </div>
            </div>
          }
          {children}
        </div>
      </div>
    </div>
  )
}

export default ChatMessageByAdmin