import { TokenERC20, TokenERC20__factory } from "../@custom-thirdweb-dev/contracts";
import { ContractMetadata } from "../core/classes/contract-metadata";
import { ContractRoles } from "../core/classes/contract-roles";
import { IStorage, NetworkOrSignerOrProvider, TransactionResult } from "../core";
import { SDKOptions } from "../schema/sdk-options";
import { ContractWrapper } from "../core/classes/contract-wrapper";
import { Erc20 } from "../core/classes/erc-20";
import { TokenMintInput } from "../schema/tokens/token";
import { ContractEncoder } from "../core/classes/contract-encoder";
import { GasCostEstimator } from "../core/classes";
import { Amount, CurrencyValue } from "../types";
import { TokenERC20History } from "../core/classes/erc-20-history";
import { ContractEvents } from "../core/classes/contract-events";
import { Erc20SignatureMinting } from "../core/classes/erc-20-signature-minting";
/**
 * Create a standard crypto token or cryptocurrency.
 *
 * @example
 *
 * ```javascript
 * import { ThirdwebSDK } from "@thirdweb-dev/sdk";
 *
 * // You can switch out this provider with any wallet or provider setup you like.
 * const provider = ethers.Wallet.createRandom();
 * const sdk = new ThirdwebSDK(provider);
 * const contract = sdk.getToken("{{contract_address}}");
 * ```
 *
 * @public
 */
export declare class Token extends Erc20<TokenERC20> {
    static contractType: "token";
    static contractRoles: readonly ["admin", "minter", "transfer"];
    static contractFactory: typeof TokenERC20__factory;
    /**
     * @internal
     */
    static schema: {
        deploy: import("zod").ZodObject<import("zod").extendShape<import("zod").extendShape<import("zod").extendShape<import("zod").extendShape<{
            name: import("zod").ZodString;
            description: import("zod").ZodOptional<import("zod").ZodString>;
            image: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodTypeAny, import("zod").ZodString]>>;
            external_link: import("zod").ZodOptional<import("zod").ZodString>;
        }, {
            symbol: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
        }>, {
            platform_fee_basis_points: import("zod").ZodDefault<import("zod").ZodNumber>;
            platform_fee_recipient: import("zod").ZodDefault<import("zod").ZodEffects<import("zod").ZodString, string, string>>;
        }>, {
            primary_sale_recipient: import("zod").ZodEffects<import("zod").ZodString, string, string>;
        }>, {
            trusted_forwarders: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodEffects<import("zod").ZodString, string, string>, "many">>;
        }>, "strip", import("zod").ZodTypeAny, {
            description?: string | undefined;
            image?: any;
            external_link?: string | undefined;
            symbol: string;
            name: string;
            primary_sale_recipient: string;
            platform_fee_basis_points: number;
            platform_fee_recipient: string;
            trusted_forwarders: string[];
        }, {
            symbol?: string | undefined;
            description?: string | undefined;
            image?: any;
            external_link?: string | undefined;
            platform_fee_basis_points?: number | undefined;
            platform_fee_recipient?: string | undefined;
            trusted_forwarders?: string[] | undefined;
            name: string;
            primary_sale_recipient: string;
        }>;
        output: import("zod").ZodObject<import("zod").extendShape<import("zod").extendShape<{
            name: import("zod").ZodString;
            description: import("zod").ZodOptional<import("zod").ZodString>;
            image: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodTypeAny, import("zod").ZodString]>>;
            external_link: import("zod").ZodOptional<import("zod").ZodString>;
        }, {
            image: import("zod").ZodOptional<import("zod").ZodString>;
        }>, {
            symbol: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
        }>, "strip", import("zod").ZodLazy<import("zod").ZodType<import("../core").Json, import("zod").ZodTypeDef, import("../core").Json>>, {
            [x: string]: import("../core").Json;
            description?: string | undefined;
            image?: string | undefined;
            external_link?: string | undefined;
            symbol: string;
            name: string;
        }, {
            [x: string]: import("../core").Json;
            symbol?: string | undefined;
            description?: string | undefined;
            image?: string | undefined;
            external_link?: string | undefined;
            name: string;
        }>;
        input: import("zod").ZodObject<import("zod").extendShape<{
            name: import("zod").ZodString;
            description: import("zod").ZodOptional<import("zod").ZodString>;
            image: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodTypeAny, import("zod").ZodString]>>;
            external_link: import("zod").ZodOptional<import("zod").ZodString>;
        }, {
            symbol: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
        }>, "strip", import("zod").ZodTypeAny, {
            description?: string | undefined;
            image?: any;
            external_link?: string | undefined;
            symbol: string;
            name: string;
        }, {
            symbol?: string | undefined;
            description?: string | undefined;
            image?: any;
            external_link?: string | undefined;
            name: string;
        }>;
    };
    metadata: ContractMetadata<TokenERC20, typeof Token.schema>;
    roles: ContractRoles<TokenERC20, typeof Token.contractRoles[number]>;
    encoder: ContractEncoder<TokenERC20>;
    estimator: GasCostEstimator<TokenERC20>;
    history: TokenERC20History;
    events: ContractEvents<TokenERC20>;
    /**
     * Signature Minting
     * @remarks Generate tokens that can be minted only with your own signature, attaching your own set of mint conditions.
     * @example
     * ```javascript
     * // see how to craft a payload to sign in the `contract.signature.generate()` documentation
     * const signedPayload = contract.signature.generate(payload);
     *
     * // now anyone can mint the NFT
     * const tx = contract.signature.mint(signedPayload);
     * const receipt = tx.receipt; // the mint transaction receipt
     * const mintedId = tx.id; // the id of the NFT minted
     * ```
     */
    signature: Erc20SignatureMinting;
    constructor(network: NetworkOrSignerOrProvider, address: string, storage: IStorage, options?: SDKOptions, contractWrapper?: ContractWrapper<TokenERC20>);
    /** ******************************
     * READ FUNCTIONS
     *******************************/
    /**
     * Get your wallet voting power for the current checkpoints
     *
     * @returns the amount of voting power in tokens
     */
    getVoteBalance(): Promise<CurrencyValue>;
    getVoteBalanceOf(account: string): Promise<CurrencyValue>;
    /**
     * Get your voting delegatee address
     *
     * @returns the address of your vote delegatee
     */
    getDelegation(): Promise<string>;
    /**
     * Get a specific address voting delegatee address
     *
     * @returns the address of your vote delegatee
     */
    getDelegationOf(account: string): Promise<string>;
    /** ******************************
     * WRITE FUNCTIONS
     *******************************/
    /**
     * Mint Tokens for the connected wallet
     *
     * @remarks See {@link Token.mintTo}
     */
    mint(amount: Amount): Promise<TransactionResult>;
    /**
     * Mint Tokens
     *
     * @remarks Mint tokens to a specified address.
     *
     * @example
     * ```javascript
     * const toAddress = "{{wallet_address}}"; // Address of the wallet you want to mint the tokens to
     * const amount = "1.5"; // The amount of this token you want to mint
     *
     * await contract.mintTo(toAddress, amount);
     * ```
     */
    mintTo(to: string, amount: Amount): Promise<TransactionResult>;
    /**
     * Mint Tokens To Many Wallets
     *
     * @remarks Mint tokens to many wallets in one transaction.
     *
     * @example
     * ```javascript
     * // Data of the tokens you want to mint
     * const data = [
     *   {
     *     toAddress: "{{wallet_address}}", // Address to mint tokens to
     *     amount: 0.2, // How many tokens to mint to specified address
     *   },
     *  {
     *    toAddress: "0x...",
     *    amount: 1.4,
     *  }
     * ]
     *
     * await contract.mintBatchTo(data);
     * ```
     */
    mintBatchTo(args: TokenMintInput[]): Promise<TransactionResult>;
    /**
     * Lets you delegate your voting power to the delegateeAddress
     *
     * @param delegateeAddress - delegatee wallet address
     * @alpha
     */
    delegateTo(delegateeAddress: string): Promise<TransactionResult>;
}
