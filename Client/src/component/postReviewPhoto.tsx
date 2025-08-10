import React, { useState } from 'react';
import { Modal } from './UI';
import { Image } from '../interface/ImagePhotoUrl';
interface PostReviewPhotoProps {
  photos?: Image[];
}

const PostReviewPhoto = ({ photos = [] }: PostReviewPhotoProps) => {
  const displayPhotos = photos.slice(0, 7);
  const morePhotosCount = photos.length - 7;
  const [isOpen, setOpen] = useState<boolean>(false);
  return (
    <div className="flex gap-3 mt-3 cursor-pointer">
      {displayPhotos.map((photo, index) => (
        <div key={index} className="relative" onClick={() => { setOpen(true) }}>
          <img
            src={photo.url}
            alt={`Reviewer ${index + 1}`}
            className="object-cover aspect-square w-30"
          />
          {index === 6 && morePhotosCount > 0 && (
            <div className="bg-[rgba(0,0,0,0.3)] w-full h-full absolute top-0 left-0 flex items-center justify-center">
              <p className="font-bold text-white text-2xl">+{morePhotosCount}</p>
            </div>
          )}
        </div>
      ))}

      <Modal isOpen={isOpen} onClose={() => { setOpen(false) }}>
          <h2 className="text-2xl font-bold mb-4">Review Photos</h2>
          <div className="grid grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <img 
                key={index}
                src={photo.url}
                alt={`Review Photo ${index + 1}`}
                className="object-cover aspect-square w-80"
              />
            ))}
          </div>
      </Modal>
    </div>
  );
};

export default PostReviewPhoto;
