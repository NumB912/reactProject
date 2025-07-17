import React, { useState } from "react";
import UploadPhotos from "./UploadPhotos";
import { ImageUrlProp } from "./UploadPhotos";
import { Button, ButtonCircle } from "./UI";
const UploadPostPhoto = () => {
  const [photos, setPhotos] = useState<ImageUrlProp[]>([]);
  return (
    <div className="upload-post-photo flex flex-col gap-5">
    {
      photos.length > 0 && (
        <>
          <div className="upload overflow-y-auto min-h-[400px] max-h-[800px] space-y-4 mb-4 pr-1">
            {photos.map((photo, index) => (
              <div
                key={index}
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
                    onClick={() => {}}
                  />
                </div>

                <div className="w-full">
                  <textarea
                    placeholder="What's this of? Why is this special?"
                    value={photo.description || ""}
                    className="w-full border border-gray-300 p-4 bg-gray-50 rounded-md resize-none"
                    rows={4}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
            <Button onClick={() => {}} className="rounded-md min-w-40">
              Add more photos
            </Button>
            <Button onClick={() => {}} className="rounded-md min-w-40">
              Upload {photos.length} photo
            </Button>
          </div>
        </>
      )
    }
          {
            photos.length === 0 && (
                 <UploadPhotos photos={photos} setPhotos={setPhotos} />
            )
          }
    </div>
  );
};

export default UploadPostPhoto;
