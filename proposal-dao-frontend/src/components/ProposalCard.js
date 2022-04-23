import { ThumbUpIcon } from "@heroicons/react/solid";

const ProposalCard = ({ id, proposer, proposal, votes, userAddress, vote, voted }) => {
  return (
    <div
      className='
              flex-col 
              rounded-lg 
              bg-gradient-to-tl 
              from-teal-300 
              to-indigo-300
              p-3'>
      <div className='text-gray-600 font-semibold flex justify-center'>
        {proposal}
      </div>
      <div className="flex justify-between  mt-1">
        <div className="text-gray-600 font-medium">Votes: {votes}</div>
        {
          (userAddress && userAddress.toLowerCase() === proposer.toLowerCase()) || voted ?
            <></>
            : <ThumbUpIcon
              className="
                h-5 
                text-gray-600 
                cursor-pointer
                hover:text-blue-600"
              onClick={() => vote(id)}
            />
        }
      </div>
    </div>
  )
}

export default ProposalCard;