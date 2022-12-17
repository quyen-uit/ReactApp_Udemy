import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  setFiles: (files: any) => void;
}

function PhotoWidgetDropZone({ setFiles }: Props) {
  const onDrop = useCallback((acceptedFiles: any) => {
    let a = acceptedFiles.map((file: any) => Object.assign(file, {
      preview: URL.createObjectURL(file),
      file: file
  }));
    setFiles(a)
   }, [setFiles]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}

export default PhotoWidgetDropZone;
