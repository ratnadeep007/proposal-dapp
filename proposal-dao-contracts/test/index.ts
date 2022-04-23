import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("ProposalVoting", function () {
  let voting: Contract;

  before(async () => {
    const Voting = await ethers.getContractFactory("ProposalVoting");
    voting = await Voting.deploy("Voter");
    await voting.deployed();
  });

  it("Should return proper app name", async function () {
    expect(await voting.appName()).to.equal("Voter");
  });

  it("Should be able to create proposals and return all", async function () {
    await voting.addProposal("Proposal 1");
    await voting.addProposal("Proposal 2");
    const proposals = await voting.getAllProposals();

    expect(proposals.length).to.equal(2);
  });

  it("Should be able to vote on a proposal", async function () {
    const a = await ethers.getSigners();
    const newAcc1 = a[a.length - 1];
    const newAcc2 = a[a.length - 2];

    const txn = await voting.connect(newAcc1).vote(1);
    await txn.wait();
    const txn2 = await voting.connect(newAcc2).vote(1);
    await txn2.wait();

    const proposal = await voting.getProposal(1);

    expect(proposal.votes).to.equal(2);
  });
});
