import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useUploadPhotoStore } from "../store/useUploadPhoto";
import { CssBaselineProps } from "@mui/material";

export interface ImageUrlProp {
  id: string;
  url: string;
  description: string;
}

export interface UploadPhotosHandle {
  openFileDialog: () => void;
}

interface uploadPhotoProp{
  style?:React.CSSProperties
}


const UploadPhotos = forwardRef<UploadPhotosHandle,uploadPhotoProp>((props, ref) => {
  const { addPhotos } = useUploadPhotoStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    openFileDialog: () => {
      inputRef.current?.click();
    },
  }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addPhotos(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      addPhotos(Array.from(e.dataTransfer.files));
    }
  };

  

  return (
    <div className="space-y-4" style={props.style}>
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="bg-gray-100 flex flex-col justify-center items-center w-full h-full rounded-md min-h-[300px] max-h-[400px] cursor-pointer"
      >
        <i className="fa-solid fa-camera text-3xl mb-2"></i>
        <p className="font-bold">Click to add photos</p>
        <p className="text-sm font-thin">or drag and drop</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
});

export default UploadPhotos;
