import React from "react";
import { useDropzone } from "react-dropzone";

export const FileDrag = () => {
  const onDrop = React.useCallback((acceptedFiles) => {
    // Do something with the files
    console.log("acceptedFiles:", acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open, acceptedFiles } =
    useDropzone({ onDrop, noClick: true });

  const files = React.useMemo(// file更新時の処理
    () =>{
      acceptedFiles.map((file) => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
      )),
    [acceptedFiles]
  }
  );

  console.log('acceptedFiles:',acceptedFiles)

  return (
    <div
      {...getRootProps()}
      //className="w-80 h-40 bg-gray-100 rounded-2xl p-2"
      className="h-40 bg-gray-100 rounded-2xl p-2"
    >
      <input {...getInputProps()} />
      <p>
        {isDragActive
          ? "Drop the files here ..."
          : "Drag and drop or browse a file"}
      </p>
      <button type="button" onClick={open}>
        Select files
      </button>
    </div>
  );
};
