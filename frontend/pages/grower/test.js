import Image from "next/image";
import { Header } from "../../components/layout/header";
import { Web3Storage } from "web3.storage";
import { ethers } from "ethers";
import axios from "axios";
import React from "react";

const CONTRACT_ADDRESS = "0x7b261ee52c98d2d68cb832ae3d8e59867255f6eb";
//const abi = getAbi();

const CIDs = {
  sampleAgave: "bafybeia7sjg3qocu4y6mpurn6d63dryssjukttznnc2xbulztrsrxk37fy", // sample-agabe
  agave_sm: "bafybeiar6dfobbdn2ccdaclutrcs7k2q7275y6np6qrdizoec4tid3ic5q", // agave_titanota_small.obj
  sample: "bafybeiavqfxfewrtepomj4c5b5jdvaepgsohizphffs4hyz7boscw6qxc4", // sample.glb
};

const web3_CIDs = {
  sampleAgave: "bafybeib45e6lu6k7m54buak73gewlzoultkz6mpcyvej5hr5ujn6cqor7a", // web3.storage sample-agabe
  agave_sm: "bafybeiewzzs7kvyjtrt6yhwgrftfog3cp3vpnmpqhyvsrq7kyr4nkmlane", // web3.storage agave_titanota_small.obj
  sample: "bafybeif6hsworgd6727c67heq6rvu7u4pjs5szg45lx3v4azigfsemvhf4", // web3.storage sample.glb
};

const UploadNFT = () => {
  const [abi, setAbi] = React.useState([]);

  console.log("API:", process.env.NEXT_PUBLIC_API_KEY);

  React.useEffect(() => {
    //if (!isDetectedWallet()) return
    ethereum = window.ethereum;
    (async () => {
      // リロード時にアカウント取得（接続済のみ）
      const acts = await ethereum.request({ method: "eth_accounts" });
      const _abi = await getAbi();
      setAbi(_abi);
      console.log("set abi:", _abi);
    })();

    // イベント定義
    ethereum.on("accountsChanged", (_accounts) => {
      //setAccount(_accounts)
    });
  }, []);

  //const abi = async () => await getAbi();

  const mintNFT = async () => {
    console.log("preparing mint...");
    ethereum = window.ethereum;
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      console.log("#");
      const signer = provider.getSigner();
      console.log("##");
      console.log("# abi:", abi);
      const nftContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

      console.log("##");
      const imageURL = `ipfs://${CIDs.sampleAgave}`;
      const animationURL = `ipfs://${CIDs.sample}`;
      const name = "Agabe 005";
      const description = "test description";

      console.log("#");

      const nftTx = await nftContract.makeAgaveNFT(
        imageURL,
        animationURL,
        name,
        description
      );

      const tx = await nftTx.wait();
      console.log("minted: ", tx);
      const event = tx.events[0];
      const value = event.args[2];
      const tokenId = value.toNumber();
    } catch (error) {
      console.error("Error minting:", error);
    }
  };

  return (
    <>
    <div className="flex flex-col">
      <button
        className={
          "rounded py-2 px-4 font-bold" +
          " " +
          "bg-blue-500 text-white hover:bg-blue-400 m-2"
        }
        onClick={async () =>
          await retrieve(
            //"bafybeib45e6lu6k7m54buak73gewlzoultkz6mpcyvej5hr5ujn6cqor7a" // web3.storage sample-agabe
            //"bafybeia7sjg3qocu4y6mpurn6d63dryssjukttznnc2xbulztrsrxk37fy"//
            //"bafybeiewzzs7kvyjtrt6yhwgrftfog3cp3vpnmpqhyvsrq7kyr4nkmlane" // web3.storage agave_titanota_small.obj
            //"bafybeiar6dfobbdn2ccdaclutrcs7k2q7275y6np6qrdizoec4tid3ic5q" // agave_titanota_small.obj
            //"bafybeif6hsworgd6727c67heq6rvu7u4pjs5szg45lx3v4azigfsemvhf4" // web3.storage sample.glb
            "bafybeiavqfxfewrtepomj4c5b5jdvaepgsohizphffs4hyz7boscw6qxc4" // sample.glb
          )
        }
      >
        Retrieve
      </button>
      <button
        className={
          "rounded py-2 px-4 font-bold" +
          " " +
          "bg-blue-500 text-white hover:bg-blue-400 m-2"
        }
        onClick={async () => await mintNFT()}
      >
        Mint
      </button>
      <button
        className={
          "rounded py-2 px-4 font-bold" +
          " " +
          "bg-blue-500 text-white hover:bg-blue-400 m-2"
        }
        onClick={async () => await getAbi()}
      >
        GET ABI
      </button>
      </div>
    </>
  );
};
export default UploadNFT;

function getAccessToken() {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  // return 'paste-your-token-here'

  // In a real app, it's better to read an access token from an
  // environement variable or other configuration that's kept outside of
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  //return process.env.WEB3STORAGE_TOKEN
  return process.env.NEXT_PUBLIC_API_KEY;
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

async function retrieve(cid) {
  console.log("making StorageClient...");
  const client = makeStorageClient(); // web3Clientの作成
  try {
    console.log("getting response...");
    const res = await client.get(cid);
    console.log(`Got a response! [${res.status}] ${res.statusText}`);
    if (!res.ok) {
      throw new Error(`failed to get ${cid}`);
    }
    console.log("res:", res);
    const files = await res.files();
    console.log("files:", files.length);
    for (const f of files) {
      console.log("file:", f);
    }
  } catch (e) {
    console.log("retrieve error:", e);
  }
}

const getAbi = async () => {
  try {
    const res = await axios.get(
      "https://api-testnet.polygonscan.com/api?module=contract&action=getabi&address=0x7b261ee52C98d2D68Cb832ae3D8E59867255f6Eb"
    );
    const data = res.data;
    console.log("data", data);
    console.log("abi:", JSON.parse(data.result));
    return data.result;
  } catch (error) {
    console.log("axios error:", error);
  }
};
