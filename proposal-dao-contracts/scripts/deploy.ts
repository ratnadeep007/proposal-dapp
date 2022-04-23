/* eslint-disable no-process-exit */
import hre from "hardhat";

async function main() {
  const [owner] = await hre.ethers.getSigners();
  const PropsoalVotingFactory = await hre.ethers.getContractFactory(
    "ProposalVoting"
  );
  const PropsoalVoting = await PropsoalVotingFactory.deploy("Voter");
  await PropsoalVoting.deployed();

  console.log("PropsoalVoting deployed to:", PropsoalVoting.address);
  console.log("PropsoalVoting owner address:", owner.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
