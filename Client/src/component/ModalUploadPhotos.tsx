import React from 'react'

const ModalUploadPhotos = () => {
  return (
              <Modal styleContainer='p-10 w-5/10' isOpen={isOpen} onClose={() => { setOpen(!isOpen) }}>
                <div className='title'>
                    <p className='font-bold text-3xl'>Add photos</p>
                </div>
                <div className='bg-gray-100 p-5 rounded-md my-5'>
                    <p><span className='font-bold'>Uploading your file</span> 2 of 2 photos successfully uploaded</p>
                </div>

                <div className='list-photo-upload flex flex-col gap-3 overflow-y-scroll min-h-[400px] max-h-[500px] py-5'>

                    {tempPhotos.map((photo, index) => (
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

                <div className='flex border-t border-gray-200 gap-2 p-3'>

                    <Button onClick={handleClick}>Add photo</Button>
                    <Button onClick={handleAttachPhotos}>Attach photos</Button>

                </div>
            </Modal>
  )
}

export default ModalUploadPhotos