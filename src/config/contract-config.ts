export const supportedChainId = 137;
export const infuraId = "b80bc115a7e04d4ea3b0345a8f296089";
export const rpcUrl =
  "https://polygon-mainnet.infura.io/v3/b80bc115a7e04d4ea3b0345a8f296089";
export const token = "0xFDEc85f9b11856E78D6E15E09500E5B60201003f";
export const truncatedToken = "0xFDE.......1003f";
export const presale_vesting = "0xFDEc85f9b11856E78D6E15E09500E5B60201003f";
export const liquidity = "0xd75d71ca22bE295B46E2f462D95D5098E4F08b1b";
export const development = "0x9bA4d73dD6b0C0a5b259db1AD7f10737ccC54d8c";
export const presale = "0xFDEc85f9b11856E78D6E15E09500E5B60201003f";

export enum CONTRACT_NAME_ENUM {
  ADVISOR = "Advisor",
  DEVELOPMENT = "Development",
  INFLUENCERS = "Influencers",
  LIQUIDITY = "Liquidity",
  MARKETING = "Marketing",
  STAKING = "Staking",
  TEAM = "Team",
  PRESALE = "Presale",
  PRIVATE_SALE = "Private Sale",
  TREASURY = "Treasury",
  PUBLIC_SALE = "Public Sale",
  PRESALE_VESTING = "Presale Vesting",
}
interface IContract {
  name: string;
  address: string;
  value: number;
}
export const contractList: IContract[] = [
  // { name: CONTRACT_NAME_ENUM.ADVISOR, address: advisor, value: 0 },
  { name: CONTRACT_NAME_ENUM.DEVELOPMENT, address: development, value: 1 },
  // { name: CONTRACT_NAME_ENUM.INFLUENCERS, address: influencers, value: 2 },
  { name: CONTRACT_NAME_ENUM.LIQUIDITY, address: liquidity, value: 3 },
  // { name: CONTRACT_NAME_ENUM.MARKETING, address: marketing, value: 4 },
  // { name: CONTRACT_NAME_ENUM.STAKING, address: staking, value: 5 },
  // { name: CONTRACT_NAME_ENUM.TEAM, address: team, value: 6 },
  {
    name: CONTRACT_NAME_ENUM.PRESALE_VESTING,
    address: presale_vesting,
    value: 7,
  },
  // { name: CONTRACT_NAME_ENUM.PRIVATE_SALE, address: privatesale, value: 8 },
  // { name: CONTRACT_NAME_ENUM.TREASURY, address: treasury, value: 9 },
  // { name: CONTRACT_NAME_ENUM.PUBLIC_SALE, address: publicsale, value: 10 },
];
