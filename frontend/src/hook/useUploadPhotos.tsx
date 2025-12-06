import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Image } from '../model/image';

const useUploadPhotos = () => {
  const [photos,setPhotos] = React.useState<Image[]>([]);
  const addPhotos = (files:File[]) =>{
    if(files.length === 0) return;

    const newPhotos = files.map((file, index) => {
      return {
        url: URL.createObjectURL(file),
        description: "",
        imageID: uuidv4(), 
        altText: "", 
      } as Image;
    })

    return newPhotos.length > 0 && setPhotos((prev) => [...prev, ...newPhotos]);
  }

  const removePhoto = (index:number) => {
    if(index < 0 || index >= photos.length) return;
    setPhotos((prev)=> prev.filter((_,i)=> i !== index));
  }

  const updateDescription = (index:number,description:string)=>{
    if(index < 0 || index >= photos.length) return;
    setPhotos((prev) => {
      const updatePhotos = prev[index];
      if(description === updatePhotos.description) return prev;
      return prev.map((item)=>{return item.imageID === updatePhotos.imageID ? {...item, description} : item;})
    })
  }

  return {
    addPhotos,
    removePhoto,
    updateDescription,
    photos,
  }
}

export default useUploadPhotos