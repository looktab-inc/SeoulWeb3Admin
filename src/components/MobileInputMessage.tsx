import Image from "next/image";
import {useState} from "react";
import {MessageTemplateType} from "@/util/enums/enum";
import useCustom from "@/hooks/useCustom";
import useMobileChat from "@/hooks/useMobileChat";

const MobileInputMessage = () => {
  const chat = useMobileChat()
  const [input, setInput] = useState('')

  // @ts-ignore
  const handleInputKeyPress = (event) => {
    setInput(event.target.value)
    if (event.key === 'Enter') {
      if (event.metaKey || event.ctrlKey) {
        // Enter + Command 또는 Enter + Ctrl일 때 개행 처리
        event.preventDefault(); // 기본 동작인 개행 방지

        const textarea = event.target;
        const { selectionStart, selectionEnd } = textarea;
        const value = textarea.value;

        const beforeText = value.substring(0, selectionStart);
        const afterText = value.substring(selectionEnd);
        const newText = beforeText + '\n' + afterText;

        setInput(newText);
        textarea.selectionStart = selectionStart + 1;
        textarea.selectionEnd = selectionStart + 1;
      } else {
        // Enter 키만 눌렸을 때 채팅 입력
        event.preventDefault(); // 폼 제출 방지
        handleSubmit()
        setInput('');
      }
    }
  }

  const handleSubmit = () => {
    chat.addChat({
      template: MessageTemplateType.DEFAULT,
      text: input
    })
    setInput('')
  }

  return (
    <div className={'absolute w-[86%] max-w-[600px] bottom-0 pb-[40px] my-0 mx-auto left-0 right-0 bg-zinc-100'}>
      <textarea
        className={'shadow shadow-black/20 border-zinc-300 px-[20px] py-[16px] h-[72px] bg-white rounded-2xl w-full resize-none'}
        placeholder={'메세지를 입력해주세요.'}
        onChange={handleInputKeyPress}
        onKeyDown={handleInputKeyPress}
        value={input}
      />
      <div className={"absolute top-[16px] right-[16px]"}>
        <button
          className="w-[36px] h-[36px] lg:w-[40px] lg:h-[40px] p-[10px] "
          onClick={handleSubmit}
        >
          <div className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] relative">
            <Image src={'/images/icons/icon-photo.png'} alt={'send image'} fill/>
          </div>
        </button>
        <button
          className="w-[36px] h-[36px] lg:w-[40px] lg:h-[40px] p-[10px] bg-green-500 rounded-lg ml-[8px] "
          onClick={handleSubmit}
        >
          <div className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] relative">
            <Image src={'/images/icons/icon-send.png'} alt={'send message'} fill/>
          </div>
        </button>
      </div>

    </div>
  )
}

export default MobileInputMessage