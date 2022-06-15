/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers';
import TokenERC721 from 'src/contracts/TokenERC721.json';
import { Web3Provider } from '@ethersproject/providers';
import { StoreState } from 'src/utils/storeTypes';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { ellipsizeAddress, epochToDate } from 'src/utils/functions/utils';
import { useParams } from 'react-router-dom';
const borderStyle = 'border-opacity-20 border-blue-600';

interface Props {
  contractAddress?: string;
}

type CustomParams = {
  id: string;
};

const TransactionsHistory: React.FC<Props> = ({ contractAddress }) => {
  const provider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider,
  );
  const [transfersHistory, setTransfersHistory] = useState<any[]>([]);
  const { id: nftId } = useParams<CustomParams>();
  const getTransfers = useCallback(async () => {
    if (provider && contractAddress) {
      try {
        const contract = new ethers.Contract(
          contractAddress,
          TokenERC721.abi,
          provider?.getSigner(),
        );

        const mintsFilter = contract.filters.TokensMinted();
        const transferFilter = contract.filters.Transfer();
        const salesFilter = contract.filters.OwnerUpdated();

        const mints = await contract.queryFilter(mintsFilter);
        const transfers = await contract.queryFilter(transferFilter);
        const sales = await contract.queryFilter(salesFilter);

        const mintsHistory: any[] = [];
        const _transfersHistory: any[] = [];
        const salesHistory: any[] = [];

        transfers?.forEach(async (t) => {
          if (t.decode) {
            const decoded = t.decode(t.data, t.topics);
            const block = await t.getBlock();
            const receipt = await t.getTransactionReceipt();
            const txx = await t.getTransaction();
            if (decoded.tokenId.toString() === nftId) {
              _transfersHistory.push({
                ...decoded,
                timestamp: epochToDate(block.timestamp),
              });
            }
          }
        });

        setTransfersHistory(_transfersHistory);
      } catch (error) {
        console.log('Error: ', error);
      }
    }
  }, [provider, contractAddress, nftId]);

  useEffect(() => {
    getTransfers();
  }, [getTransfers]);

  return (
    <div className="mt-4 py-3">
      <p className="text-xl">Transfer History</p>
      <div
        className={`${borderStyle} border-b-[2px] w-full bg-black bg-opacity-30 p-6 mt-2 rounded-xl`}
      >
        {transfersHistory.length > 0 ? (
          <div>
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
        ) : (
          <p>No transfer history for this item</p>
        )}
      </div>
    </div>
  );
};

export default TransactionsHistory;
