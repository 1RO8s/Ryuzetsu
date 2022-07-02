const MyNFTs = () => {
  return (
    <>
      <a-scene>
        
        <a-assets>
          #
          <a-asset-item id="tree" src="agave_titanota_small_resized.glb">
            sss
          </a-asset-item>
          #
        </a-assets>
        <a-gltf-model
          src="#tree"
          position="0 0.5 -2"
          rotation="0 -45 0"
          scale="0.2 0.2 0.2"
        >
        </a-gltf-model>
        <a-sky color="#ECECEC"></a-sky>
      </a-scene>
    </>
  );
};
export default MyNFTs;
