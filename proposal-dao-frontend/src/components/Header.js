const Header = ({ connectWallet, isWalletConnected }) => {
  return (
    <div className="pt-2 flex justify-between">
      <div className="text-lg font-bold text-yellow-600">
        Proposal Voting
      </div>
      {
        isWalletConnected ? <div></div> :
          <div
            className="
              bg-gradient-to-r 
              from-teal-500 
              to-indigo-500
              rounded-lg
              px-3
              font-semibold
              text-gray-800
              cursor-pointer"
            onClick={connectWallet}
          >
            Connect to Wallet
          </div>
      }
    </div >
  )
}

export default Header;