import { BigNumber, BigNumberish } from "ethers";
import { Provider } from "@ethersproject/providers";
import { SignerOrProvider } from "../core";
import { NewAuctionListing, NewDirectListing, Offer } from "../types/marketplace";
/**
 * This method checks if the given token is approved for the marketplace contract.
 * This is particularly useful for direct listings where the token
 * being listed may be moved before the listing is actually closed.
 *
 * @internal
 * @param provider - The connected provider
 * @param marketplaceAddress - The address of the marketplace contract
 * @param assetContract - The address of the asset contract.
 * @param tokenId - The token id of the token.
 * @param from - The address of the account that owns the token.
 * @returns - True if the marketplace is approved on the token, false otherwise.
 */
export declare function isTokenApprovedForMarketplace(provider: Provider, marketplaceAddress: string, assetContract: string, tokenId: BigNumberish, from: string): Promise<boolean>;
/**
 * Checks if the marketplace is approved to make transfers on the assetContract
 * If not, it tries to set the approval.
 * @param signerOrProvider
 * @param marketplaceAddress
 * @param assetContract
 * @param tokenId
 * @param from
 */
export declare function handleTokenApproval(signerOrProvider: SignerOrProvider, marketplaceAddress: string, assetContract: string, tokenId: BigNumberish, from: string): Promise<void>;
/**
 * Used to verify fields in new listing.
 * @internal
 */
export declare function validateNewListingParam(param: NewDirectListing | NewAuctionListing): void;
/**
 * Maps a contract offer to the strict interface
 *
 * @internal
 * @param offer
 * @returns - An `Offer` object
 */
export declare function mapOffer(provider: Provider, listingId: BigNumber, offer: any): Promise<Offer>;
export declare function isWinningBid(winningPrice: BigNumberish, newBidPrice: BigNumberish, bidBuffer: BigNumberish): boolean;
