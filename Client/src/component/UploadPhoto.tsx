import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Button, ButtonCircle, Modal } from './UI'; // nút xoá, giả sử bạn có icon X ở đây
import Photos from '../pages/Auths/InfoClient/Photos';

interface ImageUrlProp {
    id: string,
    url: string,
    description: string,
}

const UploadPhoto: React.FC = () => {
    const inputPhotos = useRef<HTMLInputElement | null>(null);
    const [photos, setPhotos] = useState<ImageUrlProp[]>([]);
    const [isOpen, setOpen] = useState<boolean>(false)


    const handleClick = () => {
        inputPhotos.current?.click();
    };


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);
        const imageUrls = files.map((file) => ({
            url: URL.createObjectURL(file),
            id: crypto.randomUUID(),
            description: ""
        }));

        setPhotos((prev) => [...prev, ...imageUrls]);

        if (!isOpen) {
            setOpen(true);
        }


    };


    const handleRemovePhoto = (indexToRemove: number) => {
        const revokePhoto = photos[indexToRemove]
        URL.revokeObjectURL(revokePhoto.url)
        setPhotos((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleDragPhoto = (e: React.DragEvent<HTMLDivElement>)=>{
        e.preventDefault()
    }

    const handleDropPhoto = (e:React.DragEvent<HTMLDivElement>)=>{
        e.preventDefault()
        if(!e.dataTransfer.files)return;
        const files = Array.from(e.dataTransfer.files)
        const imageUrls = files.map((file) => ({
            url: URL.createObjectURL(file),
            id: crypto.randomUUID(),
            description: ""
        }));

        setPhotos((prev) => [...prev, ...imageUrls]);

        if (!isOpen) {
            setOpen(true);
        }
    }


    return (
        <div className="post-review-content__add-more-photo row-span-2 flex-col flex gap-5">
            <div>
                <p className=" font-bold text-2xl">
                    Add some photos
                </p>
                <p className='text-md'>Optional</p>
            </div>

            <div className={`option-photos ${photos.length==0?"hidden":""}`}>
                <div className="list-photos flex gap-3 overflow-x-auto">
                    {photos.map((photo, index) => (
                        <div key={index} className="relative min-w-60">
                            <img
                                src={photo.url}
                                alt={`uploaded-${index}`}
                                className="object-cover w-60 h-40 rounded-md"
                            />
                            <ButtonCircle
                                className="absolute top-2 right-2"
                                onClick={() => handleRemovePhoto(index)}
                            />
                        </div>
                    ))}
                </div>
                
                <div className={`edit-list-photo ${photos.length == 0 ? "hidden" : ""}`} >
                    <button className='cursor-pointer font-bold underline mt-2' onClick={() => {setOpen(true)}}>Edit photo</button>
                </div>
            </div>


            <Modal styleContainer='p-10 w-5/10' isOpen={isOpen} onClose={() => { setOpen(!isOpen) }}>
                <div className='title'>
                    <p className='font-bold text-3xl'>Add photos</p>
                </div>
                <div className='bg-gray-100 p-5 rounded-md my-5'>
                    <p><span className='font-bold'>Uploading your file</span> 2 of 2 photos successfully uploaded</p>
                </div>

                <div className='list-photo-upload flex flex-col gap-3 overflow-y-scroll min-h-[400px] max-h-[500px] py-5'>

                    {photos.map((photo, index) => (
                        <div key={index} className="min-w-60 flex gap-7">
                            <div className='relative'>
                                <img
                                    src={photo.url}
                                    alt={`uploaded-${index}`}
                                    className="object-cover w-60 h-40 rounded-md"
                                />
                                <ButtonCircle
                                    className="absolute top-2 right-2"
                                    onClick={() => handleRemovePhoto(index)}
                                />
                            </div>
                            <div className='upload-content w-full'>
                                <textarea placeholder="What's this of? Why is this special?" key={index} className='w-3/4 border-gray-300 border-2 p-5 bg-gray-50' />
                            </div>
                        </div>
                    ))}
                </div>

                <div className='flex border-t border-gray-200 gap-2 p-3 justify-end'>
                    <Button onClick={handleClick} className='rounded-md min-w-40'>Add photo</Button>
                    <Button onClick={()=>setOpen(false)} className='rounded-md min-w-40'>Done</Button>
                </div>
            </Modal>
            <div
                className="bg-gray-100 flex flex-col justify-center items-center w-full h-full rounded-md min-h-[300px] max-h-[400px] cursor-pointer"
                onClick={handleClick}
                onDrag={()=>{console.log("onDrag")}}
                onDragOver={handleDragPhoto}
                onDrop={handleDropPhoto}
            >
                <i className="fa-solid fa-camera text-3xl mb-2"></i>
                <p className="font-bold">Click to add photos</p>
                <p className="text-sm font-thin">or drag and drop</p>
                <input
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.gif,.png"
                    ref={inputPhotos}
                    onChange={handleChange}
                    className="hidden"
                    aria-hidden="true"
                />
            </div>
        </div>
    );
};

export default UploadPhoto;
