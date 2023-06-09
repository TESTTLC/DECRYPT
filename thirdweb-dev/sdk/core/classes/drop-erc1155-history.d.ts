import { DropERC1155 } from "../../@custom-thirdweb-dev/contracts";
import { ContractWrapper } from "./contract-wrapper";
import { BigNumberish } from "ethers";
/**
 * Manages history for Edition Drop contracts
 * @public
 */
export declare class DropErc1155History {
    private contractWrapper;
    constructor(contractWrapper: ContractWrapper<DropERC1155>);
    /**
     * Get all claimer addresses
     *
     * @remarks Get a list of all the addresses that have claimed a token
     * @param tokenId - the tokenId of the NFT to get the addresses of*
     * @returns - A unique list of addresses that claimed the token
     * @example
     * ```javascript
     * const tokenId = "0";
     * const allClaimerAddresses = await contract.history.getAllClaimerAddresses(tokenId);
     * ```
     */
    getAllClaimerAddresses(tokenId: BigNumberish): Promise<string[]>;
}
