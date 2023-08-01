// static data

import {SEED, Tone} from "@/util/enums/enum";

export const TONES = [
  {
    type: Tone.FRIENDLY,
    title: '친절한'
  },
  {
    type: Tone.PLEASANT,
    title: '유쾌한',
  },
  {
    type:Tone.PROFESSIONAL,
    title: '프로페셔널한',
  }
]

export const SEEDS = [
  {
    type: SEED.TREE,
    title: '나무 (6단계)  10kg 이상의 CO2를 저장하는 NFT'
  },
  {
    type: SEED.FLOWER,
    title: '꽃 (3단계) 1~10kg 의 CO2를 저장하는 NFT',
  },
  {
    type: SEED.GRAIN,
    title: '작물 (1단계)  100g 의 CO2를 저장하는 NFT',
  }
]

export const GROWTH_STAGE = [
  {
    type: SEED.TREE,
    reference_image: [
      "https://seoul-web3-admin.vercel.app/images/references/tree_1.png",
      "https://seoul-web3-admin.vercel.app/images/references/tree_2.png",
      "https://seoul-web3-admin.vercel.app/images/references/tree_3.png",
      "https://seoul-web3-admin.vercel.app/images/references/tree_4.png",
      "https://seoul-web3-admin.vercel.app/images/references/tree_5.png",
    ]
  },
  {
    type: SEED.FLOWER,
    reference_image: [
      "https://seoul-web3-admin.vercel.app/images/references/flower_1.png",
      "https://seoul-web3-admin.vercel.app/images/references/flower_2.png",
      "https://seoul-web3-admin.vercel.app/images/references/flower_3.png",
    ]
  },
  {
    type: SEED.GRAIN,
    reference_image: [
      "https://seoul-web3-admin.vercel.app/images/references/grain_1.png",
      "https://seoul-web3-admin.vercel.app/images/references/grain_2.png",
    ]
  },
]

export const TREES = ['appleTree', 'pineTree', 'oakTree']
export const FLOWERS = ['rose', 'Sunflower'];
export const GRAINS = ['wheat'];

export const TREE_REFERENCES = [
  "https://seoul-web3-admin.vercel.app/images/references/tree_1.png",
  "https://seoul-web3-admin.vercel.app/images/references/tree_2.png",
  "https://seoul-web3-admin.vercel.app/images/references/tree_3.png",
  "https://seoul-web3-admin.vercel.app/images/references/tree_4.png",
  "https://seoul-web3-admin.vercel.app/images/references/tree_5.png",
]

export const FLOWER_REFERENCES = [
  "https://seoul-web3-admin.vercel.app/images/references/tree_1.png",
  "https://seoul-web3-admin.vercel.app/images/references/tree_2.png",
  "https://seoul-web3-admin.vercel.app/images/references/tree_3.png",
  "https://seoul-web3-admin.vercel.app/images/references/tree_4.png",
  "https://seoul-web3-admin.vercel.app/images/references/tree_5.png",
]

export const GRAIN_REFERENCES = [
  "https://seoul-web3-admin.vercel.app/images/references/grain_1.png",
  "https://seoul-web3-admin.vercel.app/images/references/grain_2.png",
]

export const INFO_TEXT_1 = "다음 행동을 통해 리워드를 받을 수 있습니다."

export const INFO_TEXT_2 =
  '        모바일 영수증 캡쳐 사진 인증 - 10 리워드:\n' +
  '        유저가 앱에서 지원하는 가게에서 물건을 구매하고, 구매한 상품의 영수증을 앱에 업로드하여 사진 인증을 할 수 있습니다. 인증된 영수증에 따라 10 포인트가 즉시 지급됩니다. 이렇게 하면 영수증을 이용하여 소비내역을 확인하고 보상으로 포인트를 얻을 수 있습니다.' +
  '        \n\n' +
  '        다회용기 사용 캡쳐 인증 - 100 리워드:\n' +
  '        환경 보호를 위해 유저가 다회용기를 사용하면 앱에서 인증을 해주는 기능이 있습니다. 사용한 다회용기의 사진을 업로드하여 인증을 하면 100 포인트가 적립됩니다. 이렇게 함으로써 일회용품 사용을 줄이고 환경 보호에 기여하는 유저에게 포인트로 보상을 주는 것입니다.' +
  '        \n\n' +
  '        100걸음당 1 CO2 탄소배출권 적립:\n' +
  '        앱은 유저의 활동량을 측정하여 걸음 수를 기록합니다. 유저가 걸음을 증가시킬수록 앱에서는 이를 활용하여 유저가 생산하는 CO2 배출량을 계산합니다. 100걸음마다 1개의 CO2 탄소배출권이 적립되며, 이렇게 적립된 탄소배출권은 환경 보호 단체와 협력하여 환경 보전에 사용됩니다.' +
  '        \n\n' +
  '        이렇게 앱은 유저가 다양한 방법으로 포인트를 획득할 수 있도록 하여 활동에 대한 보상을 제공하고, 동시에 환경 보호와 같은 긍정적인 행동을 유도하는 시스템을 구축합니다. 유저들은 이러한 포인트 시스템을 통해 보상을 받으며 환경 보호에 기여하는 즐거움을 느낄 수 있습니다.' +
  '  '