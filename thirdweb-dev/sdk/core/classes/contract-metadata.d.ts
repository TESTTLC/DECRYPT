import { IThirdwebContract } from "../../@custom-thirdweb-dev/contracts";
import { z } from "zod";
import { IStorage } from "../interfaces/IStorage";
import { ContractWrapper } from "./contract-wrapper";
/**
 * @internal
 */
export interface IGenericSchemaType {
    deploy: z.AnyZodObject;
    input: z.AnyZodObject;
    output: z.AnyZodObject;
}
/**
 * Handles metadata for a Contract
 * @public
 */
export declare class ContractMetadata<TContract extends IThirdwebContract, TSchema extends IGenericSchemaType> {
    private contractWrapper;
    private schema;
    private storage;
    constructor(contractWrapper: ContractWrapper<TContract>, schema: TSchema, storage: IStorage);
    /**
     * @internal
     */
    parseOutputMetadata(metadata: any): z.output<TSchema["output"]>;
    /**
     * @internal
     */
    parseInputMetadata(metadata: any): z.input<TSchema["input"]>;
    /**
     *
     * @returns the metadata of the given contract
     */
    get(): Promise<z.output<TSchema["output"]>>;
    /**
     *
     * @param metadata - the metadata to set
     * @returns
     */
    set(metadata: z.input<TSchema["input"]>): Promise<(<A>() => A extends never ? 1 : 0 extends <A_1>() => A_1 extends z.output<TSchema["output"]> ? 1 : 0 ? 1 : 0) extends 1 ? Omit<{
        receipt: import("@ethersproject/abstract-provider").TransactionReceipt;
        data: () => Promise<unknown>;
    }, "data"> : {
        receipt: import("@ethersproject/abstract-provider").TransactionReceipt;
        data: () => Promise<z.output<TSchema["output"]>>;
    }>;
    update(metadata: Partial<z.input<TSchema["input"]>>): Promise<(<A>() => A extends never ? 1 : 0 extends <A_1>() => A_1 extends z.output<TSchema["output"]> ? 1 : 0 ? 1 : 0) extends 1 ? Omit<{
        receipt: import("@ethersproject/abstract-provider").TransactionReceipt;
        data: () => Promise<unknown>;
    }, "data"> : {
        receipt: import("@ethersproject/abstract-provider").TransactionReceipt;
        data: () => Promise<z.output<TSchema["output"]>>;
    }>;
    /**
     *
     * @internal
     * @param metadata - the metadata to set
     * @returns
     */
    _parseAndUploadMetadata(metadata: z.input<TSchema["input"]>): Promise<string>;
}
