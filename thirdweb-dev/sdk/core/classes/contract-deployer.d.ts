import { NetworkOrSignerOrProvider, ValidContractClass } from "../types";
import { z } from "zod";
import { ContractRegistry } from "./registry";
import { SDKOptions } from "../../schema/sdk-options";
import { IStorage } from "../interfaces";
import { RPCConnectionHandler } from "./rpc-connection-handler";
import { MarketplaceContractDeployMetadata, NFTContractDeployMetadata, SplitContractDeployMetadata, TokenContractDeployMetadata, VoteContractDeployMetadata } from "../../types/deploy/deploy-metadata";
/**
 * Handles deploying new contracts
 * @public
 */
export declare class ContractDeployer extends RPCConnectionHandler {
    /**
     * @internal
     * should never be accessed directly, use {@link ContractDeployer.getFactory} instead
     */
    private _factory;
    /**
     * @internal
     * should never be accessed directly, use {@link ContractDeployer.getRegistry} instead
     */
    private _registry;
    private storage;
    constructor(network: NetworkOrSignerOrProvider, options: SDKOptions, storage: IStorage);
    /**
     * Deploys a new NFTCollection contract
     * @param metadata - the contract metadata
     * @returns the address of the deployed contract
     */
    deployNFTCollection(metadata: NFTContractDeployMetadata): Promise<string>;
    /**
     * Deploys a new NFTDrop contract
     * @param metadata - the contract metadata
     * @returns the address of the deployed contract
     */
    deployNFTDrop(metadata: NFTContractDeployMetadata): Promise<string>;
    /**
     * Deploys a new Edition contract
     * @param metadata - the contract metadata
     * @returns the address of the deployed contract
     */
    deployEdition(metadata: NFTContractDeployMetadata): Promise<string>;
    /**
     * Deploys a new EditionDrop contract
     * @param metadata - the contract metadata
     * @returns the address of the deployed contract
     */
    deployEditionDrop(metadata: NFTContractDeployMetadata): Promise<string>;
    /**
     * Deploys a new Token contract
     * @param metadata - the contract metadata
     * @returns the address of the deployed contract
     */
    deployToken(metadata: TokenContractDeployMetadata): Promise<string>;
    /**
     * Deploys a new Marketplace contract
     * @param metadata - the contract metadata
     * @returns the address of the deployed contract
     */
    deployMarketplace(metadata: MarketplaceContractDeployMetadata): Promise<string>;
    /**
     * Deploys a new Pack contract
     * @param metadata - the contract metadata
     * @returns the address of the deployed contract
     */
    deployPack(metadata: NFTContractDeployMetadata): Promise<string>;
    /**
     * Deploys a new Split contract
     * @param metadata - the contract metadata
     * @returns the address of the deployed contract
     */
    deploySplit(metadata: SplitContractDeployMetadata): Promise<string>;
    /**
     * Deploys a new Vote contract
     * @param metadata - the contract metadata
     * @returns the address of the deployed contract
     */
    deployVote(metadata: VoteContractDeployMetadata): Promise<string>;
    /**
     * Deploys a new contract
     *
     * @internal
     * @param contractType - the type of contract to deploy
     * @param contractMetadata - the metadata to deploy the contract with
     * @returns a promise of the address of the newly deployed contract
     */
    deployContract<TContract extends ValidContractClass>(contractType: TContract["contractType"], contractMetadata: z.input<TContract["schema"]["deploy"]>): Promise<string>;
    /**
     * @internal
     */
    getRegistry(): Promise<ContractRegistry>;
    private getFactory;
    updateSignerOrProvider(network: NetworkOrSignerOrProvider): void;
    private updateContractSignerOrProvider;
}
