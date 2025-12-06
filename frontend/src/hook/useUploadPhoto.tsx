// hook/useUploadPhoto.tsx
import { useState, useCallback } from "react";
import { Image } from "../model/image";
import { v4 as uuidv4 } from "uuid";

interface UseSingleUploadPhotoProps {
  uploadFunction?: (file: File) => Promise<string>;
  initialPhoto?: Image;
}
 const useSingleUploadPhoto = (props: UseSingleUploadPhotoProps = {}) => {
  const { uploadFunction, initialPhoto } = props;

  // Lưu cả File gốc + Image info
  const [file, setFile] = useState<File | null>(null);
  const [photo, setPhoto] = useState<Image | undefined>(initialPhoto);
  const [isUploading, setIsUploading] = useState(false);

  const addPhoto = useCallback(
    async (newFile: File) => {
      setIsUploading(true);
      setFile(newFile); // ← LƯU FILE GỐC

      try {
        const url = uploadFunction
          ? await uploadFunction(newFile)
          : URL.createObjectURL(newFile);

        setPhoto({
          imageID: uuidv4(),
          url,
          altText: "",
          description: "",
          fileName: newFile.name,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsUploading(false);
      }
    },
    [uploadFunction]
  );

  const deletePhoto = () => {
    if (photo?.url.startsWith("blob:")) {
      URL.revokeObjectURL(photo.url);
    }
    setFile(null);
    setPhoto(undefined);
  };

  return {
    photo,
    file,           
    addPhoto,
    deletePhoto,
    isUploading,
  };
};

export default useSingleUploadPhoto