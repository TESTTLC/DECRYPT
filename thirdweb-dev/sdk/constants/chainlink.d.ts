import { BigNumber } from "ethers";
/**
 *
 * @internal
 */
export declare type ChainlinkInfo = {
    vrfCoordinator: string;
    linkTokenAddress: string;
    keyHash: string;
    fees: BigNumber;
};
/**
 *
 * @internal
 */
export declare const ChainlinkVrf: Record<number, ChainlinkInfo>;
