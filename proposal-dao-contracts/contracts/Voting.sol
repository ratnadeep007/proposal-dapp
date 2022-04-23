//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract ProposalVoting {
    string public appName;

    struct Proposal {
        uint256 id;
        address proposer;
        string proposal;
        uint256 votes;
        address[] voters;
    }

    Proposal[] public proposals;

    constructor(string memory _appName) {
        appName = _appName;
    }

    function addProposal(string memory _proposal) public {
        uint256 lengthOfProposals = proposals.length;

        Proposal memory proposal = Proposal({
            id: lengthOfProposals + 1,
            proposer: msg.sender,
            proposal: _proposal,
            votes: 0,
            voters: new address[](0)
        });

        proposals.push(proposal);
    }

    function vote(uint256 _proposalId) public {
        Proposal storage proposal = proposals[_proposalId - 1];

        require(
            proposal.proposer != msg.sender, 
            "Cannot vote on your own proposal"
        );
        
        for (uint256 i = 0; i < proposal.voters.length; i++) {
            require(
                proposal.voters[i] != msg.sender, 
                "Already voted on this proposal"
            );
        }

        proposal.votes++;
        proposal.voters.push(msg.sender);
    }

    function getProposal(uint256 _proposalId) public view returns (Proposal memory) {
        Proposal memory proposal = proposals[_proposalId - 1];
        return proposal;
    }

    function getAllProposals() public view returns (Proposal[] memory) {
        return proposals;
    }
}
