import {CreateNFTStep} from "@/util/enums/enum";
import LNBItem from "@/components/lnb/LNBItem";
import useCustom from "@/hooks/useCustom";

const LNB = () => {
  const wallet = useCustom()
  const LNBs = [
    {
      step: CreateNFTStep.step1,
      text: "NFT 정보 입력",
    },
    {
      step: CreateNFTStep.step2,
      text: "NFT 발급",
    },
    {
      step: CreateNFTStep.step3,
      text: "NFT 발급 완료",
    },
  ]

  return (
    <div className="hidden lg:block w-[300px] py-[40px] px-[20px] bg-white border border-zinc-200 flex-none">
      <div className="flex-col justify-start items-start gap-8 inline-flex">
        {
          LNBs.map((item, index) => {
            const currentStep = wallet.getCreateNFTInfo().step
            return (
              <LNBItem
                key={index}
                step={item.step}
                text={item.text}
                completed={currentStep > item.step}
                current={currentStep === item.step}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default LNB