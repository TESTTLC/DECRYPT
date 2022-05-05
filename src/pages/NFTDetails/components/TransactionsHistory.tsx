/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers';
import MarketplaceJSON from 'src/contracts/Marketplace.json';
import { MarketplaceFilter } from '@thirdweb-dev/sdk/dist/types/marketplace/MarketPlaceFilter';
import { formatEther } from 'ethers/lib/utils';
import { useCreateNFTMutation } from 'src/redux/modules/nfts/queries';
import TokenERC721 from 'src/contracts/TokenERC721.json';
import { EtherscanProvider, Web3Provider } from '@ethersproject/providers';
import {
  marketplaceAddress,
  nativeTLCAddress,
  TLLPTokenContractAddress,
  TLNFTTokenContractAddress,
} from 'src/utils/globals';
import { StoreState } from 'src/utils/storeTypes';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { ellipsizeAddress, epochToDate } from 'src/utils/functions/utils';
const borderStyle = 'border-opacity-20 border-blue-600';

interface Props {
  contractAddress?: string;
}

const TransactionsHistory: React.FC<Props> = ({ contractAddress }) => {
  const provider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider,
  );
  const [transfersHistory, setTransfersHistory] = useState<any[]>([]);
  //   const walletAddress = useSelector<StoreState, string | undefined>(
  //     (state) => state.account.walletAddress,
  //   );

  const getTransfers = useCallback(async () => {
    if (provider && contractAddress) {
      //   const owned = `${process.env.REACT_APP_TLX_RPC_API}?module=account&action=tokenlist&address=${walletAddress}`;
      //   console.log('Owned: ', owned);

      try {
        // const ownedResult = await fetch(owned);
        // const ownedData = await ownedResult.json();
        // console.log('Owned: ', ownedData);

        const contract = new ethers.Contract(
          contractAddress,
          TokenERC721.abi,
          provider?.getSigner(),
        );

        const marketplaceContract = new ethers.Contract(
          marketplaceAddress,
          MarketplaceJSON.abi,
          provider?.getSigner(),
        );
        console.log('marketplaceFilters: ', marketplaceContract.filters);
        console.log('contractFilters: ', contract.filters);

        const mintsFilter = contract.filters.TokensMinted();
        const transferFilter = contract.filters.Transfer();
        const salesFilter = contract.filters.OwnerUpdated();
        const filter: MarketplaceFilter = {
          tokenContract: contractAddress,
          tokenId: 0,
        };
        console.log('filters: ', contract.filters);
        const mints = await contract.queryFilter(mintsFilter);
        const transfers = await contract.queryFilter(transferFilter);
        const sales = await contract.queryFilter(salesFilter);

        const mintsHistory: any[] = [];
        const _transfersHistory: any[] = [];
        const salesHistory: any[] = [];

        // mints.forEach(async (m) => {
        //   const receipt = await m.getTransactionReceipt();

        //   mintsHistory.push({ from: receipt.from, to: receipt.to });
        // });

        transfers?.forEach(async (t) => {
          if (t.decode) {
            const decoded = t.decode(t.data, t.topics);
            const block = await t.getBlock();
            const receipt = await t.getTransactionReceipt();
            const txx = await t.getTransaction();
            // console.log('M: ', t);
            // console.log('txx: ', txx);
            console.log('transfers: ', t.decode(t.data, t.topics));
            // console.log('block: ', block);
            // console.log('receipt: ', receipt);
            console.log('txx: ', txx);
            _transfersHistory.push({
              ...decoded,
              timestamp: epochToDate(block.timestamp),
            });
          }
        });

        // sales.forEach(async (t) => {
        //   const receipt = await t.getTransactionReceipt();
        //   salesHistory.push({ from: receipt.from, to: receipt.to });
        // });

        // console.log('mintsHistory: ', mintsHistory);
        console.log('transfersHistory: ', transfersHistory);
        // console.log('salesHistory: ', salesHistory);

        // contract.on(transferFilter, (from, to, amount, event, qst) => {
        //   console.log('own tokens: ', from, to, amount, event, qst);
        //   // if (to === walletAddress) {
        //   // }
        // });

        setTransfersHistory(_transfersHistory);
      } catch (error) {
        console.log('Error: ', error);
      }
    }
  }, [provider, contractAddress]);

  useEffect(() => {
    getTransfers();
  }, [getTransfers]);

  return transfersHistory.length > 0 ? (
    <div className="mt-4 py-3">
      <p className="text-xl">Transfer History</p>
      <div
        className={`${borderStyle} border-b-[2px] w-full bg-black bg-opacity-30 p-6 mt-2 rounded-xl`}
      >
        <div>
          <p></p>
          <div className="flex justify-between text-xl mb-3">
            <p className="flex-[0.33] text-left">From</p>
            <p className="flex-[0.33] text-center">To</p>
            <p className="flex-[0.33] text-right">Date</p>
          </div>
          {transfersHistory.map((t) => {
            return (
              <div className="flex justify-between my-1">
                <p className="flex-[0.33] text-left">
                  {ellipsizeAddress(t.from, 8)}
                </p>
                <p className="flex-[0.33] text-center">
                  {ellipsizeAddress(t.to, 8)}
                </p>
                <p className="flex-[0.33] text-right">{t.timestamp}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ) : null;
};

export default TransactionsHistory;
