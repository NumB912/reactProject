import React, { createContext } from 'react'

interface ContextOpenModalType{
  isOpenEditAvatarPhotoModal:boolean;
  setIsOpenEditAvatarPhotoModal:(value:boolean)=>void;
}

const contextProfile = createContext<ContextOpenModalType|null>(null)

const ProfileCtx = ()=>{


    return 
}   