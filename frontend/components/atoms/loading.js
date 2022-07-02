import React from "react";
import ReactLoading from "react-loading";

const Loading = ({isLoading, message}) => {

  const overlay = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  if (isLoading) {
    return (
      <div
        id="overlay"
        className="fixed bg-gray-300"
        style={overlay}
      >
        <div className="flex flex-col">
        <ReactLoading type="spin" color="#ffffff"/>
        <p id="modalContent" className="flex flex-col w-fit text-white">
          ミント中...
        </p>
        </div>
      </div>
    )
  } else {
    return <></>
  }
}
export default Loading