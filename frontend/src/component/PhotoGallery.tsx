import React from 'react'
import { ImageUrlProp } from './UploadPhotos';

const PhotoGallery = ({ photos, onRemove }: { photos: ImageUrlProp[], onRemove: (id: string) => void }) => (
  <div className="flex flex-wrap gap-2 mt-4">
    {photos.map(photo => (
      <div key={photo.id} className="relative">
        <img src={photo.url} className="w-24 h-24 object-cover rounded" />
        <button
          onClick={() => onRemove(photo.id)}
          className="absolute top-0 right-0 bg-black text-white px-1 rounded-full"
        >
          ✕
        </button>
      </div>
    ))}
  </div>
);

export default PhotoGallery