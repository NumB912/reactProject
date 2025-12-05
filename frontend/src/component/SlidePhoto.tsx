import React, { useState } from 'react'
import { Image } from '../interface/ImagePhotoUrl'

interface SidePhotoProp{
    photos:Image[]
}

const SlidePhoto = ({photos}:SidePhotoProp) => { 
    const [selectPhoto,setSelectedPhoto] = useState<Image>(photos[0])
  

  return (
    <div>

    <img src={selectPhoto.url}/>

    </div>
  )
}

export default SlidePhoto