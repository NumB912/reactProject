import React from 'react'
import { Button, Modal } from '../../../../component/UI';
interface DeletePhotoProp{
    isOpen:boolean,
    setIsOpen:()=>void;
}
const DeletePhoto = ({isOpen,setIsOpen}:DeletePhotoProp) => {
  return (
    <Modal isOpen={isOpen} onClose={()=>{setIsOpen()}}>
        <div className='max-w-[400px]'>
         <>   <p className='font-bold text-2xl'>Photo delete</p>
            <p>Are you sure you want to delete this photo? The photo can not be retrieved once it is deleted.</p></>

            <div className='flex justify-between mt-5'>

                <Button className='bg-white border max-w-[100px] w-full'>Cancel</Button>
                <Button className='bg-black text-white border max-w-[100px] w-full'>Delete</Button>    
            </div>
        </div>
    </Modal>
  )
}

export default DeletePhoto