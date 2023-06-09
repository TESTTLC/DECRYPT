import { NFTCollection } from "./nft-collection";
import { EditionDrop } from "./edition-drop";
import { Edition } from "./edition";
import { Token } from "./token";
import { Vote } from "./vote";
import { Split } from "./split";
import { Marketplace } from "./marketplace";
import { Pack } from "./pack";
import { NFTDrop } from "./nft-drop";
/**
 * @internal
 */
export declare const CONTRACTS_MAP: {
    readonly "nft-drop": typeof NFTDrop;
    readonly "nft-collection": typeof NFTCollection;
    readonly "edition-drop": typeof EditionDrop;
    readonly edition: typeof Edition;
    readonly token: typeof Token;
    readonly vote: typeof Vote;
    readonly split: typeof Split;
    readonly marketplace: typeof Marketplace;
    readonly pack: typeof Pack;
};
/**
 * @internal
 */
export declare const REMOTE_CONTRACT_NAME: {
    readonly "nft-drop": "DropERC721";
    readonly "nft-collection": "TokenERC721";
    readonly "edition-drop": "DropERC1155";
    readonly edition: "TokenERC1155";
    readonly token: "TokenERC20";
    readonly vote: "VoteERC20";
    readonly split: "Split";
    readonly marketplace: "Marketplace";
    readonly pack: "Pack";
};
/**
 * @internal
 */
export declare const REMOTE_CONTRACT_TO_CONTRACT_TYPE: {
    readonly DropERC721: "nft-drop";
    readonly TokenERC721: "nft-collection";
    readonly DropERC1155: "edition-drop";
    readonly TokenERC1155: "edition";
    readonly TokenERC20: "token";
    readonly VoteERC20: "vote";
    readonly Split: "split";
    readonly Marketplace: "marketplace";
    readonly Pack: "pack";
};
