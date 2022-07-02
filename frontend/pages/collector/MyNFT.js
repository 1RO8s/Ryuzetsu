import React from "react";
import Image from "next/image";
import { ethers } from "ethers";
import { Card } from "../../components/organisms/card";
import { CONTRACT_ADDRESS, ABI } from "../../utils/utils";
import { LinkBar} from "../../components/atoms/linkBar"

const MyNFTs = ({ _tokenId }) => {
  const [tokenURIs, setTokenURIs] = React.useState([]);
  /**
   * 指定したtokenIdのメタデータを取得
   * @param {string} tokenId
   * @return {string} name
   * @return {string} description
   * @return {string} image
   * @return {string} animation_url
   */
  const getTokenURI = async (tokenId) => {
    ethereum = window.ethereum;
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      if (nftContract.tokenURI === undefined) {
        throw "contract.tokenURI is undefined";
      }
      const encodedTokenURI = await nftContract.tokenURI(tokenId);
      //const tokenURI = JSON.parse(atob(encodedTokenURI.slice('data:application/json;base64,'.length)))
      const tokenURI = JSON.parse(
        Buffer.from(
          encodedTokenURI.slice("data:application/json;base64,".length),
          "base64"
        )
      );
      console.log("tokenURI:", tokenURI);
      return tokenURI;
    } catch (error) {
      console.error("Error minting:", error);
    }
  };

  /**
   * 自分が所有しているTokenのIdを取得
   * @return {string[]}
   */
  const getTokenIds = async () => {
    let tokenIds = [];
    ethereum = window.ethereum;
    try {
      const count = await getCount();
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      if (nftContract.ownerOf === undefined) {
        throw "contract.ownerOf is undefined";
      }
      const acts = await ethereum.request({ method: "eth_accounts" });
      for (let i = 0; i < count; i++) {
        const owner = await nftContract.ownerOf(i);
        // console.log('1:',owner)
        // console.log('2:',acts[0])
        // console.log(`has #${i}:`,owner.toLowerCase() == acts[0].toLowerCase())
        if (owner.toLowerCase() == acts[0].toLowerCase()) {
          console.log(`owner of #${i}`);
          tokenIds.push(i);
        }
      }
      return tokenIds;
    } catch (error) {
      console.error("Error minting:", error);
    }
  };

  /**
   * コレクション内のトークン数を取得
   * @return {string[]}
   */
  const getCount = async () => {
    ethereum = window.ethereum;
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      if (nftContract.getCounter === undefined) {
        throw "contract.getCounter is undefined";
      }
      const tokenCount = await nftContract.getCounter();
      //const tokenURI = JSON.parse(atob(encodedTokenURI.slice('data:application/json;base64,'.length)))
      return tokenCount;
    } catch (error) {
      console.error("Error minting:", error);
    }
  };

  React.useEffect(() => {
    ethereum = window.ethereum;
    (async () => {
      const acts = await ethereum.request({ method: "eth_accounts" });
      console.log("acts", acts);
      const myTokenIds = await getTokenIds();
      console.log("myTokenIds;", myTokenIds);
      let _tokenURIs = [];
      for (let i = 0; i < myTokenIds.length; i++) {
        const metadata = await getTokenURI(myTokenIds[i]);
        _tokenURIs.push(metadata);
      }
      setTokenURIs(_tokenURIs);
      //const sss = await getTokenURI(0);
    })();
  }, []);

  console.log("tokenURIs:", tokenURIs);

  return (
    <>
      <div className="flex flex-col items-center p-2">
        <h2 className="text-xl font-medium my-2">Your Digital Agave</h2>
        {tokenURIs.map(
          (meta, i) => (
            <div key={i} className="my-2 flex flex-col">
              <Card
                name={meta.name}
                imageCID={meta.image.slice("ipfs://".length)}
              />
              <LinkBar
              href="https://oncyber.io/spaces/YtpGpa1ZLwVQUmO2fi3y"
              target="_blank"
              >OnCyber</LinkBar>
            </div>
          )
          // name={meta.name}
          // //owner=""
          // //imageURL=""
          // //animationURL=""
          // />
        )}
      </div>
    </>
  );

  <Image
    src={
      "https://cloudflare-ipfs.com/ipfs/bafybeia7sjg3qocu4y6mpurn6d63dryssjukttznnc2xbulztrsrxk37fy"
    }
    //src={'https://placeimg.com/140/140/any'}
    height={50}
    width={50}
  />;
};
export default MyNFTs;

export const getServerSideProps = async () => {
  return {
    props: { _tokenId: 1 },
  };
};
