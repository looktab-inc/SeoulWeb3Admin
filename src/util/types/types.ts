export type AccountType = {
  address: string;
  loggedIn: boolean;
}

export type CreateNFTType = {
  currentTemplate: string;
  step: number;
  nftTitle: string;
  nftDescription: string;
  tone: string;
  nftImage: string;
}

export type SearchLocationType = {
  country: string;
  address: string;
  longitude: number;
  latitude: number;
  range: number;
}

export type ChatType = {
  template: string;
  text?: string;
  imageURL?: string;
  reset?: boolean;
}

export type SetCreateNFTType = {
  key: string;
  value: string|number;
}

export type NFTType = {
  name: string;
  description: string;
  uri: string;
  start_time: number;
  end_time: number;
  event_type: string;
  collect_information_type: string;
  creator: string;
  enter_code: string;
  number_of_issues: string;
  nft_collection_id: string;
  created_time: number;
  collect_information_info: {
    description: string;
    location: {
      longitude: number;
      latitude: number;
    },
    address: string;
    range: number;
  }
}
