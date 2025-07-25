import React, { useEffect } from "react";
import UploadPhoto from "./UploadPhoto";
import { ImageUrlProp } from "../interface/ImagePhotoUrl";
import useUploadPhoto from "../hook/useUploadPhoto";

interface UploadPhotoWallpaperProps {
  onChange?: (photo: ImageUrlProp | undefined) => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const UploadPhotoWallpaper = ({
  onChange,
  style,
  children,
}: UploadPhotoWallpaperProps) => {
  const { addphoto, photo } = useUploadPhoto();

  useEffect(() => {
    if (onChange) {
      onChange(photo);
    }
  }, [photo]);
  return (
    <UploadPhoto handleDrop={addphoto} photo={photo} style={style}>
      {children}
    </UploadPhoto>
  );
};

export default UploadPhotoWallpaper;
