import React, { useEffect, useRef } from 'react'
import { Modal } from '../../../component/UI';
import useSingleUploadPhoto from '../../../hook/useUploadPhoto';
import UploadPhoto, { UploadPhotosHandle } from '../../../component/UploadPhoto';
import { Image } from '../../../interface/ImagePhotoUrl';

interface EditPhotoAvatarModalProp{
    setIsOpenModalUploadImageAvatar:(isOpenModalUploadImageAvatar:boolean)=>void;
    isOpenModalUploadImageAvatar:boolean;
    setPhoto:(value:Image)=>void;
}

export const EditPhotoAvatarModal = ({isOpenModalUploadImageAvatar,setIsOpenModalUploadImageAvatar,setPhoto}:EditPhotoAvatarModalProp) => {
    const {photo:avatarPhoto,addphoto:addAvatarPhoto,deletePhoto,editPhoto} = useSingleUploadPhoto()
    const inputRefAvatar = useRef<UploadPhotosHandle>(null)

    useEffect(()=>{
      if(!avatarPhoto){return}
      setPhoto(avatarPhoto)

    },[avatarPhoto])

  return (
        <Modal
          onClose={() => {
            setIsOpenModalUploadImageAvatar(false);
          }}
          isOpen={isOpenModalUploadImageAvatar}
          zIndex={1000}
          styleContainer="max-md:w-full min-sm:min-w-[500px]"
        > 
          <div className="w-full my-2 flex justify-center">

          {avatarPhoto && <img src={avatarPhoto.url} className="min-w-[100px] max-w-[200px] aspect-square object-cover rounded-full border-2 border-dashed p-1"/>}

          </div>
          <UploadPhoto
            ref={inputRefAvatar}
            photo={avatarPhoto}
            handleDrop={addAvatarPhoto}
          ></UploadPhoto>
        </Modal>
  )
}
