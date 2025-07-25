import React, { useState } from 'react'
import { ImageUrlProp } from '../interface/ImagePhotoUrl';
import { v4 as uuidv4 } from 'uuid';

const useUploadPhoto = () => {
  const [photo,setPhoto] = useState<ImageUrlProp|undefined>();

  const addphoto = (file:File)=>{
    if(file){
        const url = URL.createObjectURL(file)
        setPhoto({
            description:"",
            id:uuidv4(),
            url:url
        })
    }
  }

  const deletePhoto = ()=>{
    if(photo){
        URL.revokeObjectURL(photo.url)
        setPhoto(undefined)
    }
  }

  const editPhoto = (file:File)=>{
    if(!photo) return;
    URL.revokeObjectURL(photo.url)
    const url = URL.createObjectURL(file)
    setPhoto({
           description:"",
            id:uuidv4(),
            url:url
    })
  }

  const clearPhoto = ()=>{
    setPhoto(undefined)
  }

  return {
    photo,
    addphoto,
    deletePhoto,
    editPhoto,
    clearPhoto
  }
}

export default useUploadPhoto