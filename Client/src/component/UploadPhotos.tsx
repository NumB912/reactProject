import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { ImageUrlProp } from "../interface/ImagePhotoUrl";

export interface UploadPhotosHandle {
  openFileDialog: () => void;
}

interface uploadPhotoProp {
  style?: React.CSSProperties;
  photos?: ImageUrlProp[];
  handleDrop?: (files: File[]) => void;
  children?: React.ReactNode;
}

const UploadPhotos = forwardRef<UploadPhotosHandle, uploadPhotoProp>(
  ({ style, handleDrop, photos, children }: uploadPhotoProp, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const borderRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      openFileDialog: () => {
        inputRef.current?.click();
      },
    }));

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        handleDrop?.(Array.from(e.target.files));
      }
    };

    const handleDropSetting = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      if (e.dataTransfer.files) {
        handleDrop?.(Array.from(e.dataTransfer.files));
      }
    };

    const handleDropOverSetting = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

    };

    return (
      <div className="" style={style}>
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDropSetting}
          onDragOver={handleDropOverSetting}
          className="bg-gray-10 relative flex flex-col justify-center items-center w-full h-full rounded-md min-h-[300px] max-h-[400px] cursor-pointer *:z-20 border-2 border-dashed border-gray-300 hover:border-gray-500"
        >
          {children ? (
            children
          ) : (
            <div className="flex flex-col justify-center items-center">
              <i className="fa-solid fa-camera text-3xl mb-2"></i>
              <p className="font-bold">Click to add photos</p>
              <p className="text-sm font-thin">or drag and drop</p>
            </div>
          )}
         
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
  }
);

export default UploadPhotos;
