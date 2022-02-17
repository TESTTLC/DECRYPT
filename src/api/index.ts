import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
// axios.defaults.baseURL = "";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BACKEND,
});

export const getTransaction = async (walletAddress: string) => {
  try {
    const result = await api.get(`/transactions/get/${walletAddress}`);
    return result.data.transaction;
  } catch (error) {
    return;
  }
};

export const initialize = async (walletAddress: string) => {
  try {
    const result = await api.post("/transactions/initialize", {
      walletAddress,
    });

    return result.data.transaction;
  } catch (error) {
    return;
  }
};

export const mintNewTokens = async (walletAddress: string) => {
  try {
    const result = await api.post("/transactions/mint", {
      walletAddress,
    });
    return result.data.status;
  } catch (error) {
    return;
    // console.log("Error on api initialize: ", error);
  }
};

export const updateTransaction = async (
  walletAddress: string,
  burnStatus: "idle" | "started" | "success" | "failed"
) => {
  try {
    const result = await api.post("/transactions/update", {
      walletAddress,
      burnStatus,
    });
    return result.data.status;
  } catch (error) {
    return;
  }
};

export const claimTLC = async (
  walletAddress: string,
  amount: number,
  txHash: string
) => {
  try {
    const result = await api.post("/claims/", {
      walletAddress,
      amount,
      txHash,
    });
    console.log("Result: ", result);
  } catch (error) {
    console.log("Error: ", error);
  }
};
