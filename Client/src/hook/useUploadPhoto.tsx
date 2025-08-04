import React, { useState } from "react";
import { Image } from "../interface/ImagePhotoUrl";
import { v4 as uuidv4 } from "uuid";

const useSingleUploadPhoto = () => {
  const [photo, setPhoto] = useState<Image | undefined>();

  const addphoto = (file: File) => {
    const url = URL.createObjectURL(file);

    if(photo){
      editPhoto(file)
      return;
    }

    setPhoto({
      description: "",
      id: uuidv4(),
      url,
    });
  };

  const deletePhoto = () => {
    if (photo) {
      URL.revokeObjectURL(photo.url); // Xoá đúng lúc
      setPhoto(undefined);
    }
  };

  const editPhoto = (file: File) => {
    const oldUrl = photo?.url;

    const url = URL.createObjectURL(file);
    setPhoto({
      description: "",
      id: uuidv4(),
      url,
    });

    if (oldUrl) {
      URL.revokeObjectURL(oldUrl);
    }
  };

  return {
    photo,
    addphoto,
    deletePhoto,
    editPhoto,
  };
};

export default useSingleUploadPhoto;
