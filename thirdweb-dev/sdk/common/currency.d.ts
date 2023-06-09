import { ContractWrapper } from "../core/classes/contract-wrapper";
import { BigNumber, BigNumberish } from "ethers";
import { Provider } from "@ethersproject/providers";
import { Currency, CurrencyValue, Price } from "../types/currency";
export declare function isNativeToken(tokenAddress: string): boolean;
export declare function normalizePriceValue(provider: Provider, inputPrice: Price, currencyAddress: string): Promise<BigNumber>;
export declare function fetchCurrencyMetadata(provider: Provider, asset: string): Promise<Currency>;
export declare function fetchCurrencyValue(providerOrSigner: Provider, asset: string, price: BigNumberish): Promise<CurrencyValue>;
export declare function setErc20Allowance(contractToApprove: ContractWrapper<any>, value: BigNumber, currencyAddress: string, overrides: any): Promise<any>;
export declare function approveErc20Allowance(contractToApprove: ContractWrapper<any>, currencyAddress: string, price: BigNumber, quantity: BigNumberish): Promise<void>;
