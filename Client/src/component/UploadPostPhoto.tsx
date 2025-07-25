import React, { useEffect, useRef } from "react";
import { Button, ButtonCircle } from "./UI";
import { useUploadPhotoStore } from "../store/useUploadPhoto";
import UploadPhotos, { UploadPhotosHandle } from "./UploadPhotos";
import useUploadPhotos from "../hook/useUploadPhotos";



const UploadPostPhoto = () => {
  const { photos, addPhotos, removePhoto, updateDescription } = useUploadPhotos();
  const uploadRef = useRef<UploadPhotosHandle>(null);

  useEffect(() => {
    console.log(photos);
  }, [photos]);

  return (
    <div className="upload-post-photo flex flex-col gap-5">
      <UploadPhotos handleDrop={addPhotos} ref={uploadRef} style={{ display: photos.length === 0 ? "block" : "none" }}/>
      {photos.length > 0 && (
        <>
          <div className="upload overflow-y-auto min-h-[400px] max-h-[800px] space-y-4 mb-4 pr-1">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="flex flex-col md:flex-row gap-4 items-start"
              >
                <div className="relative w-full md:w-auto">
                  <img
                    src={photo.url}
                    alt={`uploaded-${index}`}
                    className="object-cover w-full md:w-60 h-40 rounded-md"
                  />
                  <ButtonCircle
                    className="absolute top-2 right-2"
                    onClick={() => removePhoto(index)}
                  />
                </div>

                <div className="w-full">
                  <textarea
                    placeholder="What's this of? Why is this special?"
                    value={photo.description}
                    onChange={(e) =>
                      updateDescription(index, e.target.value)
                    }
                    className="w-full border border-gray-300 p-4 bg-gray-50 rounded-md resize-none"
                    rows={4}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
            <Button
              onClick={() => uploadRef.current?.openFileDialog()}
              className="rounded-md min-w-40"
            >
              Add more photos
            </Button>
            <Button
              onClick={() => {
                console.log("Sẽ upload: ", photos);
              }}
              className="rounded-md min-w-40"
            >
              Upload {photos.length} photo
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default UploadPostPhoto;
