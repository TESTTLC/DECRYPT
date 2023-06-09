import { ContractWrapper } from "./contract-wrapper";
import { TokenERC20 } from "../../@custom-thirdweb-dev/contracts";
import { TokenHolderBalance } from "../../types";
/**
 * Manages history for Token contracts
 * @public
 */
export declare class TokenERC20History {
    private contractWrapper;
    constructor(contractWrapper: ContractWrapper<TokenERC20>);
    /**
     * Get all holder balances
     *
     * @remarks Lets you get all token holders and their corresponding balances
     * @returns - A JSON object of all token holders and their corresponding balances
     * @example
     * ```javascript
     * const allHolderBalances = await contract.history.getAllHolderBalances();
     * ```
     */
    getAllHolderBalances(): Promise<TokenHolderBalance[]>;
}
