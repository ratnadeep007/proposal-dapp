import { useEffect, useState } from 'react';
import './App.css';

import Header from "./components/Header";
import ProposalCard from './components/ProposalCard';
import getContract from './utils/web3.util';

const App = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [userAddress, setUserAddress] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [allProposals, setAllProposals] = useState([]);
  const [error, setError] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const account = accounts[0];
        setIsWalletConnected(true);
        setUserAddress(account);
        console.log("Account connected: ", account);
      } else {
        setError("Please install a MetaMask wallet to use our bank.");
        console.log("No metamask deteceted");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const checkUserAddress = () => {
    if (userAddress) {
      setIsWalletConnected(true);
    } else {
      setIsWalletConnected(false);
    }
  }

  const submitProposal = async () => {
    try {
      if (window.ethereum) {
        setIsLoading(true);
        const proposalContract = getContract(window.ethereum);
        const txn = await proposalContract.addProposal(inputValue);
        await txn.wait();
        setIsLoading(false);
        setInputValue('');
        getAllProposals();
      } else {
        setError("Please install a MetaMask wallet to use our bank.");
        console.log("No metamask deteceted");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getAllProposals = async () => {
    try {
      if (window.ethereum) {
        console.log(window.ethereum);
        const proposalContract = getContract(window.ethereum);
        const proposals = await proposalContract.getAllProposals();
        let stateProposals = [];
        for (let proposal of proposals) {
          let voted = false;
          for (let voter of proposal.voters) {
            if (voter.toLowerCase() === userAddress.toLowerCase()) {
              voted = true;
            }
          }
          stateProposals.push({
            id: parseInt(proposal.id),
            proposal: proposal.proposal,
            proposer: proposal.proposer,
            votes: parseInt(proposal.votes),
            voted: voted,
          });
        }
        console.log(stateProposals);
        setAllProposals(stateProposals);
      } else {
        setError("Please install a MetaMask wallet to use our bank.");
        console.log("No metamask deteceted");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const vote = async (id) => {
    try {
      if (window.ethereum) {
        const proposalContract = getContract(window.ethereum);
        const txn = await proposalContract.vote(id);
        await txn.wait();
        getAllProposals();
      } else {
        setError("Please install a MetaMask wallet to use our bank.");
        console.log("No metamask deteceted");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkUserAddress();
    getAllProposals();
  }, [userAddress]);

  return (
    <div className='bg-gray-800 h-screen'>
      <div className='container mx-auto'>
        <Header
          connectWallet={checkIfWalletIsConnected}
          isWalletConnected={isWalletConnected}
        />
        {
          userAddress ?
            <span
              className='text-gray-400 flex justify-center mt-2 font-semibold'>
              Welcome, {userAddress}
            </span> : <></>
        }
        {
          isLoading ?
            <div
              className='flex justify-center text-white'
            >
              Submitting your proposal: {inputValue}
            </div>
            : <div className='flex justify-center mt-3 h-full items-center'>
              <input
                className='rounded bg-gray-600 w-full p-4 text-white'
                placeholder='Enter your proposal'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <div
                className='
                  ml-3 
                  flex-col 
                  justify-center 
                  p-2
                  bg-gray-500
                  rounded-lg
                  h-full
                  text-gray-300
                  hover:bg-slate-500
                  cursor-pointer'
                onClick={submitProposal}
              >Submit</div>
            </div>
        }
        <div className='grid grid-cols-3 gap-3 mt-4'>
          {
            allProposals.map(item => <ProposalCard
              key={item.id}
              id={item.id}
              proposal={item.proposal}
              proposer={item.proposer}
              votes={item.votes}
              userAddress={userAddress}
              vote={vote}
              voted={item.voted}
            />)
          }
          {Array(10)}
        </div>
      </div>
    </div>
  );
}

export default App;
