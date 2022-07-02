import React from "react";
import Image from 'next/image'
import { ethers } from "ethers";
import { Card } from '../../components/organisms/card'
import {CONTRACT_ADDRESS, getABI} from "../../utils/utils"

const MyNFTs = () => {

  const [abi, setAbi] = React.useState('')

  /**
   * 
   * @param {string} tokenId
   * @return {string} name
   * @return {string} description
   * @return {string} imageURL
   * @return {string} animationURL
   */
  const getTokenURI = async (tokenId) => {
    ethereum = window.ethereum;
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
      console.log("nftContract:", nftContract);
      
      // if (nftContract.getRecord === undefined) throw "contract.getRecord is undefined";
      // const records = await nftContract.getRecord(tokenId);
      // const latestRecord = records[0];
      // console.log("latestRecord:", latestRecord);

      // const imgIPFS = latestRecord[0];
      // const animationIPFS = latestRecord[1];
      // const imgCID = imgIPFS.slice("ipfs://".length);
      // const animationCID = animationIPFS.slice("ipfs://".length);
      // const tx = await nftTx.wait();
      // console.log("minted: ", tx);
      // const event = tx.events[0];
      // const value = event.args[2];
      // const tokenId = value.toNumber();

      if (nftContract.tokenURI === undefined) throw "contract.tokenURI is undefined";
      console.log('get contract.tokenURI')
      const encodedTokenURI = await nftContract.tokenURI(tokenId);    
      console.log("encodedTokenURI:",encodedTokenURI)
    } catch (error) {
      console.error("Error minting:", error);
    }



  }

  React.useEffect(() => {
    (async () => {
      const _abi = await getABI();
      setAbi(_abi);
      await getTokenURI(0);
    })();
  }, []);

  return (
    <>
    <div className='flex flex-col items-center p-2'>
      <h2 className="text-xl font-medium my-2">Your Digital Agave</h2>
    <Card
      name=""
      //owner=""
      imageURL=""
      animationURL=""
    />
    <Image
    src={'https://cloudflare-ipfs.com/ipfs/bafybeia7sjg3qocu4y6mpurn6d63dryssjukttznnc2xbulztrsrxk37fy'}
    //src={'https://placeimg.com/140/140/any'}
     height={50}
     width={50}
    />
    </div>
    </>
  )
}
export default  MyNFTs