import { Web3Storage } from "web3.storage";
import { ethers } from "ethers";
import axios from "axios";
import React from "react";
import { Button } from "../../components/atoms/button";

import { FileDrag } from "../../components/organisms/fileDrag";
import { InputFile } from "../../components/atoms/inputFile";

const CONTRACT_ADDRESS = "0x7b261ee52c98d2d68cb832ae3d8e59867255f6eb";

const UploadNFT = () => {
  const [abi, setAbi] = React.useState([]);

  const [imageFile, setImageFile] = React.useState();
  const [animationFile, setAnimationFile] = React.useState();
  const [nftName, setNftName] = React.useState();
  const [description, setDescription] = React.useState();

  React.useEffect(() => {
    //if (!isDetectedWallet()) return
    ethereum = window.ethereum;
    (async () => {
      // リロード時にアカウント取得（接続済のみ）
      const acts = await ethereum.request({ method: "eth_accounts" });
      const _abi = await getAbi();
      setAbi(_abi);
      //console.log("set abi:", _abi);
    })();

    // イベント定義
    ethereum.on("accountsChanged", (_accounts) => {
      //setAccount(_accounts)
    });
  }, []);

  //const abi = async () => await getAbi();

  const mint = async () => {
    console.log("imageFile:", imageFile);
    console.log("animationFile:", animationFile);

    // IPFSにアップロード
    const client = new Web3Storage({ token: getAccessToken() });
    const uploadIPFS = async (file) => {
      const rootCid = await client.put([file], {
        name: file.name,
        maxRetries: 3,
      });
      const res = await client.get(rootCid);
      const files = await res.files();
      console.log("files[0]:", files[0]);
      return files[0].cid;
    };
    const imageFileCID = await uploadIPFS(imageFile);
    const animationFileCID = await uploadIPFS(animationFile);

    console.log("imageFileCID:", imageFileCID);
    console.log("animationFileCID:", animationFileCID);
    console.log("nftName:", nftName);
    console.log("description:", description);

    //await mintNFT(imageFileCID, animationFileCID, nftName, description);
  };

  const mintNFT = async (_imageCID, _animationCID, _name, _description) => {
    console.log("preparing mint...");
    ethereum = window.ethereum;
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

      window.contract = nftContract;
      const nftTx = await nftContract.makeAgaveNFT(
        `ipfs://${_imageCID}`,
        `ipfs://${_animationCID}`,
        _name,
        _description
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
      <div className="flex flex-col p-2 place-content-center">
        <label>Thumbnail picture</label>
        <InputFile
          name="image"
          accept=".jpg , .jpeg , .png"
          onChange={(e) => {
            const file = e.target.files[0];
            setImageFile(file);
          }}
        />
        <label>3D data</label>
        <InputFile
          name="animation"
          accept=".glb"
          onChange={(e) => {
            const file = e.target.files[0];
            setAnimationFile(file);
          }}
        />
        <labe>Name</labe>
        <input
          type="text"
          name="name"
          className="border-2 rounded-lg"
          onChange={setNftName}
        />
        <labe>Description</labe>
        <textarea
          name="description"
          className="border-2 rounded-lg"
          onChange={setDescription}
        />
        <div className="my-2 flex flex-col">
          <Button onClick={async () => await mint()}>Upload</Button>
        </div>
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
  const client = makeStorageClient();
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
    //console.log("data", data);
    //console.log("abi:", JSON.parse(data.result));
    return data.result;
  } catch (error) {
    console.log("axios error:", error);
  }
};
