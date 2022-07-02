import Image from "next/image";

export const Card = ({name="Ryuzetsu NFT #0001", owner="Pawel Czerwinski"}) => {

  const provider = new ethers.providers.Web3Provider(ethereum);

  // 
  const getURLs = async (tokenId) => {
    console.log("preparing mint...");
    ethereum = window.ethereum;
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
 
      const nftTx = await nftContract.getRecord(tokenId);

      // const tx = await nftTx.wait();
      // console.log("minted: ", tx);
      // const event = tx.events[0];
      // const value = event.args[2];
      // const tokenId = value.toNumber();
    } catch (error) {
      console.error("Error minting:", error);
    }
  };

  //const client = new Web3Storage({ token: getAccessToken() });



  return (
    <div className="flex flex-col p-2 rounded-2xl border-2">
      <Image src="/sample-agabe.jpg" alt="Ryuzetsu" width={320} height={399} className="rounded-xl"/>
      <span className="text-2xl font-bold">{name}</span>
      <div className="grow-0">
      <Image src="/sample-profile.png" alt="Owner profile" width={60} height={60} className='rounded-full'/>
      {name}
      </div>
      
    </div>
  );
};