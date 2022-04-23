import { ethers } from "ethers";
import abi from "../contract/ProposalVoting.json";
const contractAddress = "0xe9523DCe504D76992659dD3C85FB11D43610aa53";
const contractAbi = abi.abi;

const getContract = (ethereumProvider) => {
  const provider = new ethers.providers.Web3Provider(ethereumProvider);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractAbi, signer);
  return contract;
}

export default getContract;