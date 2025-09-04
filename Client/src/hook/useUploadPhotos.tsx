import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Image } from '../model/image';

const useUploadPhotos = () => {
  const [photos,setPhotos] = React.useState<Image[]>([]);
  const addPhotos = (files:File[]) =>{
    if(files.length === 0) return;

    const newPhotos = files.map((files,index)=>{
      return {
        id: uuidv4(),
        url:URL.createObjectURL(files),
        description: "",
      }
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
      return prev.map((item)=>{return item.id === updatePhotos.id ? {...item, description} : item;})
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