# Proposal DAPP

A [Cadena.dev](cadena.dev) weekly project.

### Run locally:

- Just run `npm start` it will start development server at [http://localhost:300](http://localhost:300) which connected to Rinkeby Testnet.

- If you want to change contract address and it in `src/utils/web3.util.js`.

### Deploying contract

- Add `ALCHEMY_RINKEBY_URL` and `RINKEBY_PRIVATE_KEY` in `.env` file of `proposal-dao-smartcontracts`

- Then run `npx hardhat run scripts/deploy.ts --network rinkeby`

Link of already deployed version: (https://proposal-dapp.vercel.app/)[https://proposal-dapp.vercel.app/]
