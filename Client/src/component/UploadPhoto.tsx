import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button, ButtonCircle, Modal } from "./UI"; // nút xoá, giả sử bạn có icon X ở đây
import Photos from "../pages/Auths/InfoClient/Photos";

interface ImageUrlProp {
  id: string;
  url: string;
  description: string;
}

const UploadPhoto: React.FC = () => {
  const inputPhotos = useRef<HTMLInputElement | null>(null);
  const [photos, setPhotos] = useState<ImageUrlProp[]>([]);
  const [isOpen, setOpen] = useState<boolean>(false);

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

    if (!isOpen) {
      setOpen(true);
    }
  };

  const handleRemovePhoto = (indexToRemove: number) => {
    const revokePhoto = photos[indexToRemove];
    URL.revokeObjectURL(revokePhoto.url);
    setPhotos((prev) => prev.filter((_, index) => index !== indexToRemove));
    if(photos.length==0){
        setOpen(false)
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

    if (!isOpen) {
      setOpen(true);
    }
  };


  return (
    <div className="post-review-content__add-more-photo row-span-2 flex-col flex gap-5">
      <div>
        <p className=" font-bold text-2xl">Add some photos</p>
        <p className="text-md">Optional</p>
      </div>

      <div className={`option-photos ${photos.length == 0 ? "hidden" : ""}`}>
        <div className="list-photos flex gap-3 overflow-x-auto">
          {photos.map((photo, index) => (
            <div key={index} className="relative min-w-60">
              <img
                src={photo.url}
                alt={`uploaded-${index}`}
                className="object-cover w-60 h-40 rounded-md"
              />
              <ButtonCircle
                className="absolute top-2 right-2"
                onClick={() => handleRemovePhoto(index)}
              />
            </div>
          ))}
        </div>

        <div
          className={`edit-list-photo ${photos.length == 0 ? "hidden" : ""}`}
        >
          <button
            className="cursor-pointer font-bold underline mt-2"
            onClick={() => {
              setOpen(true);
            }}
          >
            Edit photo
          </button>
        </div>
      </div>

      <Modal
        styleContainer="p-6 w-full max-w-3xl"
        isOpen={isOpen}
        onClose={() => setOpen(!isOpen)}
      >
        {/* Title */}
        <div className="mb-4">
          <p className="font-bold text-3xl">Add photos</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <p>
            <span className="font-bold">Uploading your file:</span>{" "}
            {photos.length} of {photos.length} photos successfully uploaded
          </p>
        </div>

        <div className="upload overflow-y-auto min-h-[300px] max-h-[400px] space-y-4 mb-4 pr-1">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-4 items-start"
            >
              {/* Photo Thumbnail */}
              <div className="relative w-full md:w-auto">
                <img
                  src={photo.url}
                  alt={`uploaded-${index}`}
                  className="object-cover w-full md:w-60 h-40 rounded-md"
                />
                <ButtonCircle
                  className="absolute top-2 right-2"
                  onClick={() => handleRemovePhoto(index)}
                />
              </div>

              <div className="w-full">
                <textarea
                  placeholder="What's this of? Why is this special?"
                  value={photo.description || ""}
                  onChange={(e) =>
                    handleDescriptionChange(index, e.target.value)
                  }
                  className="w-full border border-gray-300 p-4 bg-gray-50 rounded-md resize-none"
                  rows={4}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
          <Button onClick={handleClick} className="rounded-md min-w-40">
            Add photo
          </Button>
          <Button
            onClick={() => setOpen(false)}
            className="rounded-md min-w-40"
          >
            Done
          </Button>
        </div>
      </Modal>

      <div
        className="bg-gray-100 flex flex-col justify-center items-center w-full h-full rounded-md min-h-[300px] max-h-[400px] cursor-pointer"
        onClick={handleClick}
        onDrag={() => {
          console.log("onDrag");
        }}
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
        <div className="text-gray-500 text-sm mt-2">
            You can add up to 10 photos. Photos should be in JPG, JPEG, GIF, or PNG
            format.</div>
    </div>
  );
};

export default UploadPhoto;
