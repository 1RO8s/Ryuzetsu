import axios from "axios";

export const CONTRACT_ADDRESS= process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
export const WEB3STORAGE_TOKEN = process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN
const API_DOMAIN = "api-testnet.polygonscan.com";

export const getABI = async () => {
  try {
    const res = await axios.get(
      `https://${API_DOMAIN}/api?module=contract&action=getabi&address=${CONTRACT_ADDRESS}`
    );
    const data = res.data;
    return data.result;
  } catch (error) {
    console.log("axios error:", error);
  }
};
//export const ABI = await getABI()

