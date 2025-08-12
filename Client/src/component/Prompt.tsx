import React from 'react'
import { Button, Modal } from './UI'
interface PromptProp{
    isOpen:boolean;
    onClose:()=>void;
    title:string,
    content:string;
    onCancel:()=>void;
    onHandle:()=>void;
    contentHandle?:string,
    contentCancel?:string
}
const Prompt = ({isOpen,contentHandle="Submit",contentCancel="Cancel",title,content,onClose,onCancel,onHandle}:PromptProp) => {
  return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <div className='max-w-[400px]'>
         <>   <p className='font-bold text-2xl'>{title}</p>
            <p>{content}</p></>

            <div className='flex justify-between mt-5'>

                <Button className='bg-white max-w-[100px] w-full' variant='outline'  onClick={onCancel}>{contentCancel}</Button>
                <Button className='bg-black text-white max-w-[100px] w-full' onClick={onHandle}>{contentHandle}</Button>    
            </div>
        </div>
    </Modal>
  )
}

export default Prompt