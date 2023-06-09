import { IStorage } from "../interfaces/IStorage";
import { FileOrBuffer, JsonObject } from "../types";
/**
 * IPFS Storage implementation, accepts custom IPFS gateways
 * @public
 */
export declare class IpfsStorage implements IStorage {
    private gatewayUrl;
    constructor(gatewayUrl?: string);
    /**
     * {@inheritDoc IStorage.upload}
     */
    upload(data: string | FileOrBuffer, contractAddress?: string, signerAddress?: string): Promise<string>;
    /**
     * {@inheritDoc IStorage.uploadBatch}
     */
    uploadBatch(files: (string | FileOrBuffer)[], fileStartNumber?: number, contractAddress?: string, signerAddress?: string): Promise<string>;
    /**
     * {@inheritDoc IStorage.getUploadToken}
     */
    getUploadToken(contractAddress: string): Promise<string>;
    /**
     * {@inheritDoc IStorage.get}
     */
    get(hash: string): Promise<Record<string, any>>;
    /**
     * {@inheritDoc IStorage.uploadMetadata}
     */
    uploadMetadata(metadata: JsonObject, contractAddress?: string, signerAddress?: string): Promise<string>;
    /**
     * {@inheritDoc IStorage.uploadMetadataBatch}
     */
    uploadMetadataBatch(metadatas: JsonObject[], fileStartNumber?: number, contractAddress?: string, signerAddress?: string): Promise<{
        baseUri: string;
        metadataUris: string[];
    }>;
    /** *************************
     * PRIVATE FUNCTIONS
     *************************/
    private _get;
    /**
     * Pre-processes metadata and uploads all file properties
     * to storage in *bulk*, then performs a string replacement of
     * all file properties -\> the resulting ipfs uri. This is
     * called internally by `uploadMetadataBatch`.
     *
     * @internal
     *
     * @param metadata - The metadata to recursively process
     * @returns - The processed metadata with properties pointing at ipfs in place of `File | Buffer`
     */
    private batchUploadProperties;
    /**
     * This function recurisely traverses an object and hashes any
     * `Buffer` or `File` objects into the returned map.
     *
     * @param object - the Json Object
     * @param files - The running array of files or buffer to upload
     * @returns - The final map of all hashes to files
     */
    private buildFilePropertiesMap;
    private uploadBatchWithCid;
}
