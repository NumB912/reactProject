import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button, ButtonCircle, Modal } from "./UI";
export interface ImageUrlProp {
  id: string;
  url: string;
  description: string;
}

interface UploadPhotosProps {
  setPhotos: React.Dispatch<React.SetStateAction<ImageUrlProp[]>>;
  photos: ImageUrlProp[];
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  open?: boolean;
}

const UploadPhotos: React.FC<UploadPhotosProps> = ({
  setPhotos,
  photos,
  setOpen,
  open,
}) => {
  const inputPhotos = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputPhotos.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => ({
      url: URL.createObjectURL(file),
      id: crypto.randomUUID(),
      description: "",
    }));

    setPhotos((prev) => [...prev, ...imageUrls]);

    if (!open && setOpen) {
      setOpen(true);
    }
  };

  const handleDragPhoto = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDropPhoto = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!e.dataTransfer.files) return;
    const files = Array.from(e.dataTransfer.files);
    const imageUrls = files.map((file) => ({
      url: URL.createObjectURL(file),
      id: crypto.randomUUID(),
      description: "",
    }));

    setPhotos((prev) => [...prev, ...imageUrls]);

    if (!open && setOpen) {
      setOpen(true);
    }
  };

  useEffect(() => {
    return () => {
      photos.forEach((photo) => URL.revokeObjectURL(photo.url));
    };
  }, [photos]);

  return (
    <div>
      <div
        className="bg-gray-100 flex flex-col justify-center items-center w-full h-full rounded-md min-h-[300px] max-h-[400px] cursor-pointer"
        onClick={handleClick}
        onDragOver={handleDragPhoto}
        onDrop={handleDropPhoto}
      >
        <i className="fa-solid fa-camera text-3xl mb-2"></i>
        <p className="font-bold">Click to add photos</p>
        <p className="text-sm font-thin">or drag and drop</p>
        <input
          type="file"
          multiple
          accept=".jpg,.jpeg,.gif,.png"
          ref={inputPhotos}
          onChange={handleChange}
          className="hidden"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default UploadPhotos;
