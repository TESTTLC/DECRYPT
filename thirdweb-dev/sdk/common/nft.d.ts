import { BigNumber, BigNumberish } from "ethers";
import { NFTMetadata, NFTMetadataOrUri } from "../schema/tokens/common";
import { IStorage } from "../core";
import { Provider } from "@ethersproject/providers";
/**
 * fetches the token metadata
 * @param tokenId - the id (to get it back in the output)
 * @param tokenUri - the uri to fetch
 * @param storage - which storage to fetch from
 *
 * @internal
 */
export declare function fetchTokenMetadata(tokenId: BigNumberish, tokenUri: string, storage: IStorage): Promise<NFTMetadata>;
/**
 * @internal
 * @param contractAddress
 * @param provider
 * @param tokenId
 * @param storage
 */
export declare function fetchTokenMetadataForContract(contractAddress: string, provider: Provider, tokenId: BigNumberish, storage: IStorage): Promise<{
    [x: string]: import("../core").Json;
    description?: string | undefined;
    image?: string | undefined;
    external_url?: string | undefined;
    animation_url?: string | undefined;
    properties?: Record<string, import("../core").Json> | undefined;
    name: string;
    id: BigNumber;
    uri: string;
}>;
/**
 * @internal
 * @param metadata
 * @param storage
 */
export declare function uploadOrExtractURI(metadata: NFTMetadataOrUri, storage: IStorage): Promise<string>;
/**
 * @internal
 * @param metadatas
 * @param storage
 */
export declare function uploadOrExtractURIs(metadatas: NFTMetadataOrUri[], storage: IStorage): Promise<string[]>;
