import { BytesLike } from "ethers";
/**
 *
 * @internal
 */
declare const roleMap: {
    readonly admin: "";
    readonly transfer: "TRANSFER_ROLE";
    readonly minter: "MINTER_ROLE";
    readonly pauser: "PAUSER_ROLE";
    readonly editor: "EDITOR_ROLE";
    readonly lister: "LISTER_ROLE";
    readonly asset: "ASSET_ROLE";
};
/**
 * @public
 */
export declare type Role = keyof typeof roleMap;
/**
 * @public
 */
export declare const ALL_ROLES: ("admin" | "transfer" | "minter" | "pauser" | "editor" | "lister" | "asset")[];
/**
 * @internal
 */
export declare function getRoleHash(role: Role): BytesLike;
export {};
