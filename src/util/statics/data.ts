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