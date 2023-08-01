import Image from "next/image";

type LNBItemProps = {
  step: number;
  text: string;
  completed: boolean;
  current: boolean;
}

const LNBItem = ({step, text, completed, current}: LNBItemProps) => {
  return (
    <div className="justify-start items-center gap-2 inline-flex">
      <div className="flex-col justify-start items-start inline-flex">
        {
          completed ?
            <div className={'w-[28px] h-[28px] relative bg-black rounded-lg justify-center items-center flex'}>
              <Image src={'/images/icons/icon-checked.png'} alt={'complete'} width={18} height={19}/>
            </div> :
            <div
              className={`w-[28px] h-[28px] rounded-lg text-center
              ${current ? 'bg-[#1BB76C]' : 'bg-zinc-200'}`}
            >
              <div
                className={`text-[16px] font-medium inline-block align-middle ${current ? 'text-white' : 'text-[#71717A]'}`}
              >
                {step}
              </div>
            </div>
        }

      </div>
      <div className="text-zinc-800 text-[22px] font-bold">{text}</div>
    </div>
  )
}

export default LNBItem