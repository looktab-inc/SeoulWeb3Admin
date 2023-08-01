export type AccountType = {
  address: string;
  loggedIn: boolean;
}

export type CreateNFTType = {
  step: number;
  nftTitle: string;
  nftDescription: string;
  tone: string;
  nftImage: string;
  seed: string;
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
  image: string;
  attributes: NFTAtributes[]
}

export type NFTAtributes = {
  trait_type: string;
  value: string;
}

export type SelectedType = {
  type: string;
  title: string;
}