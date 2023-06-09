import { ContractInterface, ethers } from "ethers";
import { IStorage } from "./interfaces/IStorage";
import { Edition, EditionDrop, Marketplace, NFTCollection, NFTDrop, Pack, Split, Token, Vote } from "../contracts";
import { SDKOptions } from "../schema/sdk-options";
import { RPCConnectionHandler } from "./classes/rpc-connection-handler";
import type { ContractForContractType, ContractType, NetworkOrSignerOrProvider } from "./types";
import { ContractDeployer } from "./classes/contract-deployer";
import { CustomContract } from "../contracts/custom";
/**
 * The main entry point for the thirdweb SDK
 * @public
 */
export declare class ThirdwebSDK extends RPCConnectionHandler {
    /**
     * @internal
     * the cache of contracts that we have already seen
     */
    private contractCache;
    private storage;
    /**
     * New contract deployer
     */
    deployer: ContractDeployer;
    constructor(network: NetworkOrSignerOrProvider, options?: SDKOptions, storage?: IStorage);
    /**
     * Get an instance of a Drop contract
     * @param contractAddress - the address of the deployed contract
     * @returns the contract
     */
    getNFTDrop(contractAddress: string): NFTDrop;
    /**
     * Get an instance of a NFT Collection contract
     * @param address - the address of the deployed contract
     * @returns the contract
     */
    getNFTCollection(address: string): NFTCollection;
    /**
     * Get an instance of a Edition Drop contract
     * @param address - the address of the deployed contract
     * @returns the contract
     */
    getEditionDrop(address: string): EditionDrop;
    /**
     * Get an instance of an Edition contract
     * @param address - the address of the deployed contract
     * @returns the contract
     */
    getEdition(address: string): Edition;
    /**
     * Get an instance of a Token contract
     * @param address - the address of the deployed contract
     * @returns the contract
     */
    getToken(address: string): Token;
    /**
     * Get an instance of a Vote contract
     * @param address - the address of the deployed contract
     * @returns the contract
     */
    getVote(address: string): Vote;
    /**
     * Get an instance of a Splits contract
     * @param address - the address of the deployed contract
     * @returns the contract
     */
    getSplit(address: string): Split;
    /**
     * Get an instance of a Marketplace contract
     * @param address - the address of the deployed contract
     * @returns the contract
     */
    getMarketplace(address: string): Marketplace;
    /**
     * Get an instance of a Pack contract
     * @param address - the address of the deployed contract
     * @returns the contract
     */
    getPack(address: string): Pack;
    /**
     *
     * @internal
     * @param address - the address of the contract to instantiate
     * @param contractType - optional, the type of contract to instantiate
     * @returns a promise that resolves with the contract instance
     */
    getContract<TContractType extends ContractType = ContractType>(address: string, contractType: TContractType): ContractForContractType<TContractType>;
    /**
     * @param contractAddress - the address of the contract to attempt to resolve the contract type for
     * @returns the {@link ContractType} for the given contract address
     * @throws if the contract type cannot be determined (is not a valid thirdweb contract)
     */
    resolveContractType(contractAddress: string): Promise<ContractType>;
    /**
     * Return all the contracts deployed by the specified address
     * @param walletAddress - the deployed address
     */
    getContractList(walletAddress: string): Promise<{
        address: string;
        contractType: "split" | "edition-drop" | "edition" | "token" | "vote" | "marketplace" | "pack" | "nft-drop" | "nft-collection";
        metadata: () => Promise<{
            [x: string]: import("./types").Json;
            description?: string | undefined;
            image?: string | undefined;
            external_link?: string | undefined;
            name: string;
        }>;
    }[]>;
    /**
     * Update the active signer or provider for all contracts
     * @param network - the new signer or provider
     */
    updateSignerOrProvider(network: NetworkOrSignerOrProvider): void;
    private updateContractSignerOrProvider;
    /**
     * @internal
     */
    unstable_getCustomContract(address: string, abi: ContractInterface): Promise<CustomContract<ethers.BaseContract>>;
}
