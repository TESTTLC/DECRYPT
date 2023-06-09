import { ContractMetadata } from "../core/classes/contract-metadata";
import { ContractPrimarySale, ContractRoles, ContractRoyalty, IStorage, NetworkOrSignerOrProvider } from "../core";
import { SDKOptions } from "../schema/sdk-options";
import { ContractWrapper } from "../core/classes/contract-wrapper";
import { AccessControlEnumerable, IThirdwebContract, IThirdwebPrimarySale, IThirdwebRoyalty } from "../@custom-thirdweb-dev/contracts";
import { UpdateableNetwork } from "../core/interfaces/contract";
import { BaseContract, ContractInterface } from "ethers";
/**
 * Custom contract wrapper with feature detection
 * @internal
 */
export declare class CustomContract<TContract extends BaseContract = BaseContract> implements UpdateableNetwork {
    static contractType: "custom";
    static schema: {
        deploy: import("zod").ZodObject<import("zod").extendShape<import("zod").extendShape<{
            name: import("zod").ZodString;
            description: import("zod").ZodOptional<import("zod").ZodString>;
            image: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodTypeAny, import("zod").ZodString]>>;
            external_link: import("zod").ZodOptional<import("zod").ZodString>;
        }, {
            merkle: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>>;
            seller_fee_basis_points: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
            fee_recipient: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodEffects<import("zod").ZodString, string, string>>>;
            symbol: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>>;
        }>, {
            primary_sale_recipient: import("zod").ZodOptional<import("zod").ZodEffects<import("zod").ZodString, string, string>>;
            platform_fee_basis_points: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
            platform_fee_recipient: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodEffects<import("zod").ZodString, string, string>>>;
            trusted_forwarders: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodEffects<import("zod").ZodString, string, string>, "many">>>;
        }>, "strip", import("zod").ZodTypeAny, {
            symbol?: string | undefined;
            description?: string | undefined;
            image?: any;
            merkle?: Record<string, string> | undefined;
            external_link?: string | undefined;
            seller_fee_basis_points?: number | undefined;
            fee_recipient?: string | undefined;
            primary_sale_recipient?: string | undefined;
            platform_fee_basis_points?: number | undefined;
            platform_fee_recipient?: string | undefined;
            trusted_forwarders?: string[] | undefined;
            name: string;
        }, {
            symbol?: string | undefined;
            description?: string | undefined;
            image?: any;
            merkle?: Record<string, string> | undefined;
            external_link?: string | undefined;
            seller_fee_basis_points?: number | undefined;
            fee_recipient?: string | undefined;
            primary_sale_recipient?: string | undefined;
            platform_fee_basis_points?: number | undefined;
            platform_fee_recipient?: string | undefined;
            trusted_forwarders?: string[] | undefined;
            name: string;
        }>;
        output: import("zod").ZodObject<import("zod").extendShape<import("zod").extendShape<{
            name: import("zod").ZodString;
            description: import("zod").ZodOptional<import("zod").ZodString>;
            image: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodTypeAny, import("zod").ZodString]>>;
            external_link: import("zod").ZodOptional<import("zod").ZodString>;
        }, {
            image: import("zod").ZodOptional<import("zod").ZodString>;
        }>, {
            merkle: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>>;
            seller_fee_basis_points: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
            fee_recipient: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodEffects<import("zod").ZodString, string, string>>>;
            symbol: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>>;
        }>, "strip", import("zod").ZodLazy<import("zod").ZodType<import("../core").Json, import("zod").ZodTypeDef, import("../core").Json>>, {
            [x: string]: import("../core").Json;
            symbol?: string | undefined;
            description?: string | undefined;
            image?: string | undefined;
            merkle?: Record<string, string> | undefined;
            external_link?: string | undefined;
            seller_fee_basis_points?: number | undefined;
            fee_recipient?: string | undefined;
            name: string;
        }, {
            [x: string]: import("../core").Json;
            symbol?: string | undefined;
            description?: string | undefined;
            image?: string | undefined;
            merkle?: Record<string, string> | undefined;
            external_link?: string | undefined;
            seller_fee_basis_points?: number | undefined;
            fee_recipient?: string | undefined;
            name: string;
        }>;
        input: import("zod").ZodObject<import("zod").extendShape<{
            name: import("zod").ZodString;
            description: import("zod").ZodOptional<import("zod").ZodString>;
            image: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodTypeAny, import("zod").ZodString]>>;
            external_link: import("zod").ZodOptional<import("zod").ZodString>;
        }, {
            merkle: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>>;
            seller_fee_basis_points: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
            fee_recipient: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodEffects<import("zod").ZodString, string, string>>>;
            symbol: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>>;
        }>, "strip", import("zod").ZodTypeAny, {
            symbol?: string | undefined;
            description?: string | undefined;
            image?: any;
            merkle?: Record<string, string> | undefined;
            external_link?: string | undefined;
            seller_fee_basis_points?: number | undefined;
            fee_recipient?: string | undefined;
            name: string;
        }, {
            symbol?: string | undefined;
            description?: string | undefined;
            image?: any;
            merkle?: Record<string, string> | undefined;
            external_link?: string | undefined;
            seller_fee_basis_points?: number | undefined;
            fee_recipient?: string | undefined;
            name: string;
        }>;
    };
    private contractWrapper;
    private storage;
    metadata: ContractMetadata<TContract & IThirdwebContract, {
        deploy: import("zod").ZodObject<import("zod").extendShape<import("zod").extendShape<{
            name: import("zod").ZodString;
            description: import("zod").ZodOptional<import("zod").ZodString>;
            image: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodTypeAny, import("zod").ZodString]>>;
            external_link: import("zod").ZodOptional<import("zod").ZodString>;
        }, {
            merkle: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>>;
            seller_fee_basis_points: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
            fee_recipient: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodEffects<import("zod").ZodString, string, string>>>;
            symbol: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>>;
        }>, {
            primary_sale_recipient: import("zod").ZodOptional<import("zod").ZodEffects<import("zod").ZodString, string, string>>;
            platform_fee_basis_points: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
            platform_fee_recipient: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodEffects<import("zod").ZodString, string, string>>>;
            trusted_forwarders: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodEffects<import("zod").ZodString, string, string>, "many">>>;
        }>, "strip", import("zod").ZodTypeAny, {
            symbol?: string | undefined;
            description?: string | undefined;
            image?: any;
            merkle?: Record<string, string> | undefined;
            external_link?: string | undefined;
            seller_fee_basis_points?: number | undefined;
            fee_recipient?: string | undefined;
            primary_sale_recipient?: string | undefined;
            platform_fee_basis_points?: number | undefined;
            platform_fee_recipient?: string | undefined;
            trusted_forwarders?: string[] | undefined;
            name: string;
        }, {
            symbol?: string | undefined;
            description?: string | undefined;
            image?: any;
            merkle?: Record<string, string> | undefined;
            external_link?: string | undefined;
            seller_fee_basis_points?: number | undefined;
            fee_recipient?: string | undefined;
            primary_sale_recipient?: string | undefined;
            platform_fee_basis_points?: number | undefined;
            platform_fee_recipient?: string | undefined;
            trusted_forwarders?: string[] | undefined;
            name: string;
        }>;
        output: import("zod").ZodObject<import("zod").extendShape<import("zod").extendShape<{
            name: import("zod").ZodString;
            description: import("zod").ZodOptional<import("zod").ZodString>;
            image: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodTypeAny, import("zod").ZodString]>>;
            external_link: import("zod").ZodOptional<import("zod").ZodString>;
        }, {
            image: import("zod").ZodOptional<import("zod").ZodString>;
        }>, {
            merkle: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>>;
            seller_fee_basis_points: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
            fee_recipient: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodEffects<import("zod").ZodString, string, string>>>;
            symbol: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>>;
        }>, "strip", import("zod").ZodLazy<import("zod").ZodType<import("../core").Json, import("zod").ZodTypeDef, import("../core").Json>>, {
            [x: string]: import("../core").Json;
            symbol?: string | undefined;
            description?: string | undefined;
            image?: string | undefined;
            merkle?: Record<string, string> | undefined;
            external_link?: string | undefined;
            seller_fee_basis_points?: number | undefined;
            fee_recipient?: string | undefined;
            name: string;
        }, {
            [x: string]: import("../core").Json;
            symbol?: string | undefined;
            description?: string | undefined;
            image?: string | undefined;
            merkle?: Record<string, string> | undefined;
            external_link?: string | undefined;
            seller_fee_basis_points?: number | undefined;
            fee_recipient?: string | undefined;
            name: string;
        }>;
        input: import("zod").ZodObject<import("zod").extendShape<{
            name: import("zod").ZodString;
            description: import("zod").ZodOptional<import("zod").ZodString>;
            image: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodTypeAny, import("zod").ZodString]>>;
            external_link: import("zod").ZodOptional<import("zod").ZodString>;
        }, {
            merkle: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>>;
            seller_fee_basis_points: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
            fee_recipient: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodEffects<import("zod").ZodString, string, string>>>;
            symbol: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>>;
        }>, "strip", import("zod").ZodTypeAny, {
            symbol?: string | undefined;
            description?: string | undefined;
            image?: any;
            merkle?: Record<string, string> | undefined;
            external_link?: string | undefined;
            seller_fee_basis_points?: number | undefined;
            fee_recipient?: string | undefined;
            name: string;
        }, {
            symbol?: string | undefined;
            description?: string | undefined;
            image?: any;
            merkle?: Record<string, string> | undefined;
            external_link?: string | undefined;
            seller_fee_basis_points?: number | undefined;
            fee_recipient?: string | undefined;
            name: string;
        }>;
    }> | undefined;
    royalties: ContractRoyalty<TContract & IThirdwebContract & IThirdwebRoyalty, {
        deploy: import("zod").ZodObject<import("zod").extendShape<import("zod").extendShape<{
            name: import("zod").ZodString;
            description: import("zod").ZodOptional<import("zod").ZodString>;
            image: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodTypeAny, import("zod").ZodString]>>;
            external_link: import("zod").ZodOptional<import("zod").ZodString>;
        }, {
            merkle: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>>;
            seller_fee_basis_points: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
            fee_recipient: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodEffects<import("zod").ZodString, string, string>>>;
            symbol: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>>;
        }>, {
            primary_sale_recipient: import("zod").ZodOptional<import("zod").ZodEffects<import("zod").ZodString, string, string>>;
            platform_fee_basis_points: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
            platform_fee_recipient: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodEffects<import("zod").ZodString, string, string>>>;
            trusted_forwarders: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodEffects<import("zod").ZodString, string, string>, "many">>>;
        }>, "strip", import("zod").ZodTypeAny, {
            symbol?: string | undefined;
            description?: string | undefined;
            image?: any;
            merkle?: Record<string, string> | undefined;
            external_link?: string | undefined;
            seller_fee_basis_points?: number | undefined;
            fee_recipient?: string | undefined;
            primary_sale_recipient?: string | undefined;
            platform_fee_basis_points?: number | undefined;
            platform_fee_recipient?: string | undefined;
            trusted_forwarders?: string[] | undefined;
            name: string;
        }, {
            symbol?: string | undefined;
            description?: string | undefined;
            image?: any;
            merkle?: Record<string, string> | undefined;
            external_link?: string | undefined;
            seller_fee_basis_points?: number | undefined;
            fee_recipient?: string | undefined;
            primary_sale_recipient?: string | undefined;
            platform_fee_basis_points?: number | undefined;
            platform_fee_recipient?: string | undefined;
            trusted_forwarders?: string[] | undefined;
            name: string;
        }>;
        output: import("zod").ZodObject<import("zod").extendShape<import("zod").extendShape<{
            name: import("zod").ZodString;
            description: import("zod").ZodOptional<import("zod").ZodString>;
            image: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodTypeAny, import("zod").ZodString]>>;
            external_link: import("zod").ZodOptional<import("zod").ZodString>;
        }, {
            image: import("zod").ZodOptional<import("zod").ZodString>;
        }>, {
            merkle: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>>;
            seller_fee_basis_points: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
            fee_recipient: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodEffects<import("zod").ZodString, string, string>>>;
            symbol: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>>;
        }>, "strip", import("zod").ZodLazy<import("zod").ZodType<import("../core").Json, import("zod").ZodTypeDef, import("../core").Json>>, {
            [x: string]: import("../core").Json;
            symbol?: string | undefined;
            description?: string | undefined;
            image?: string | undefined;
            merkle?: Record<string, string> | undefined;
            external_link?: string | undefined;
            seller_fee_basis_points?: number | undefined;
            fee_recipient?: string | undefined;
            name: string;
        }, {
            [x: string]: import("../core").Json;
            symbol?: string | undefined;
            description?: string | undefined;
            image?: string | undefined;
            merkle?: Record<string, string> | undefined;
            external_link?: string | undefined;
            seller_fee_basis_points?: number | undefined;
            fee_recipient?: string | undefined;
            name: string;
        }>;
        input: import("zod").ZodObject<import("zod").extendShape<{
            name: import("zod").ZodString;
            description: import("zod").ZodOptional<import("zod").ZodString>;
            image: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodTypeAny, import("zod").ZodString]>>;
            external_link: import("zod").ZodOptional<import("zod").ZodString>;
        }, {
            merkle: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>>;
            seller_fee_basis_points: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodNumber>>;
            fee_recipient: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodEffects<import("zod").ZodString, string, string>>>;
            symbol: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>>;
        }>, "strip", import("zod").ZodTypeAny, {
            symbol?: string | undefined;
            description?: string | undefined;
            image?: any;
            merkle?: Record<string, string> | undefined;
            external_link?: string | undefined;
            seller_fee_basis_points?: number | undefined;
            fee_recipient?: string | undefined;
            name: string;
        }, {
            symbol?: string | undefined;
            description?: string | undefined;
            image?: any;
            merkle?: Record<string, string> | undefined;
            external_link?: string | undefined;
            seller_fee_basis_points?: number | undefined;
            fee_recipient?: string | undefined;
            name: string;
        }>;
    }> | undefined;
    roles: ContractRoles<TContract & AccessControlEnumerable, "admin" | "transfer" | "minter" | "pauser" | "editor" | "lister" | "asset"> | undefined;
    sales: ContractPrimarySale<TContract & IThirdwebPrimarySale> | undefined;
    constructor(network: NetworkOrSignerOrProvider, address: string, abi: ContractInterface, storage: IStorage, options?: SDKOptions, contractWrapper?: ContractWrapper<TContract>);
    onNetworkUpdated(network: NetworkOrSignerOrProvider): void;
    getAddress(): string;
    /** ****************************
     * FEATURE DETECTION
     ******************************/
    private detectMetadata;
    private detectRoyalties;
    private detectRoles;
    private detectPrimarySales;
}
