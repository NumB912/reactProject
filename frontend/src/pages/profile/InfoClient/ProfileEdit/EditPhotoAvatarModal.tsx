// EditPhotoAvatarModal.tsx

import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import useSingleUploadPhoto from "../../../../hook/useUploadPhoto";
import { Image } from "../../../../model/image";
import UploadPhoto from "../../../../component/upload-photo/UploadPhoto";
import { formatUrlImg } from "../../../../utils/urlFormat";

const DEFAULT_AVATAR: Image = {
  image: {
    url: "https://via.placeholder.com/400?text=No+Image",
    alt: "",
  },
};

interface EditPhotoAvatarModalProp {
  isOpenModalUploadImageAvatar: boolean;
  setIsOpenModalUploadImageAvatar: (open: boolean) => void;
  onApply: (image: Image | null, file: File | null) => void; // ĐÃ THÊM PROP NÀY
  currentPhoto?: Image;
}

export const EditPhotoAvatarModal = ({
  isOpenModalUploadImageAvatar,
  setIsOpenModalUploadImageAvatar,
  onApply,
  currentPhoto,
}: EditPhotoAvatarModalProp) => {
  const {
    photo: selectedPhoto,
    file: selectedFile,
    addPhoto,
    deletePhoto,
  } = useSingleUploadPhoto({
    initialPhoto: currentPhoto,
  });

  console.log(currentPhoto)

  const handleApply = () => {
    if (selectedPhoto && selectedFile) {
      onApply(selectedPhoto, selectedFile);
    }
    setIsOpenModalUploadImageAvatar(false);
  };

  const handleRemove = () => {
    deletePhoto();
    onApply(null, null);
    setIsOpenModalUploadImageAvatar(false);
  };

  const handleClose = () => {
    deletePhoto?.();
    setIsOpenModalUploadImageAvatar(false);
  };

  const displayPhoto = selectedPhoto || DEFAULT_AVATAR;
  return (
    <Modal open={isOpenModalUploadImageAvatar} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "92%", sm: 520 },
          bgcolor: "white",
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Change Profile Photo
        </h2>

        <div className="flex justify-center my-8">
          <img
            src={displayPhoto.image.url}
            alt="Preview"
            className="w-72 h-72 rounded-full object-cover shadow-2xl ring-8 ring-gray-100 border-4 border-white"
          />
        </div>

        <div className="my-8">
          <UploadPhoto
            photo={selectedPhoto || undefined}
            handleDrop={addPhoto}
          />
        </div>

        <div className="flex justify-center gap-6 mt-8">
          <button
            onClick={handleRemove}
            className="text-red-600 hover:underline"
          >
            Remove Photo
          </button>
          <button
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={!selectedPhoto}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Apply Photo
          </button>
        </div>
      </Box>
    </Modal>
  );
};
