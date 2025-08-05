import React, { useContext, useState } from "react";
import { Button, Modal } from "../../../component/UI";
import { Image } from "../../../interface/ImagePhotoUrl";
import { UploadPhotosHandle } from "../../../component/UploadPhotos";
import { ProfileUser } from "../../../interface/Profile";
import { EditPhotoAvatarModal } from "./EditPhotoAvatarModal";
interface EditProfileModalProp {
  isOpenEditProfileModal: boolean;
  setIsOpenEditProfileModal: (isOpenEditProfileModal: boolean) => void;
  userProfile: ProfileUser | undefined;
}

const EditProfileModal = ({
  isOpenEditProfileModal,
  setIsOpenEditProfileModal,
  userProfile,
}: EditProfileModalProp) => {
  const inputRefAvatar = React.useRef<UploadPhotosHandle>(null);
  const [photoImageAvatar, setPhotoImageAvatar] = useState<Image>();
  const [photoImageAvatarTemp, setPhotoImageAvatarTemp] = useState<Image>();
  const [isOpenEditAvatarPhotoModal, setIsOpenEditAvatarPhotoModal] =
    useState<boolean>(false);

  return (
    <>
      <Modal
        isOpen={isOpenEditProfileModal}
        onClose={() => {
          setIsOpenEditProfileModal(false);
        }}
        zIndex={100}
        styleContainer="h-9/10 max-md:w-full"
      >
        <div className="grid w-full p-5 gap-10 grid-cols-[100px_1fr] min-md:min-w-[800px] max-md:grid-cols-1 max-md:w-full max-md:gap-5">
          <div className="profile-edit-img w-full relative">
            <div
              className="relative w-full aspect-square rounded-full overflow-hidden cursor-pointer max-md:max-w-[200px] max-md:left-1/2 max-md:top-1/2 max-md:-translate-x-1/2 max-md:-translate-y-1/2"
              onClick={(e) => {
                setIsOpenEditAvatarPhotoModal(true);
              }}
            >
              <img
                src={
                  photoImageAvatarTemp
                    ? photoImageAvatarTemp.url
                    : photoImageAvatar
                    ? photoImageAvatar.url
                    : `https://m.media-amazon.com/images/M/MV5BMzg3N2I3OTAtNThlYy00ZTM0LWFiMjItZmRkNzE3NWQ5MTg2XkEyXkFqcGdeQXRyYW5zY29kZS13b3JrZmxvdw@@._V1_QL75_UX500_CR0,0,500,281_.jpg`
                }
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center">
                <i className="fa-solid fa-camera mb-1"></i>
                <p>Change Photo</p>
              </div>
            </div>
          </div>

          <div className="info-edit w-full *:mt-8">
            <div className="info-edit_name w-full">
              <p className="font-semibold text-[10px] mb-1">Name</p>
              <input
                className="border border-gray-300 p-1.5 w-full text-sm"
                type="text"
                placeholder="Name"
                value={userProfile?.name}
              />
            </div>

            <div className="info-edit_name w-full">
              <p className="font-semibold text-[10px] mb-1">Username</p>
              <span className="relative">
                <input
                  className="border border-gray-300 p-1.5 w-full pl-8 text-sm"
                  type="text"
                  placeholder="Name"
                  value={userProfile?.userName}
                />
                <span className="absolute left-0 top-1/2 -translate-y-1/2 p-1.5 text-gray-400">
                  @
                </span>
              </span>
            </div>

            <div className="info-edit_name w-full">
              <p className="font-semibold text-[10px] mb-1">Location</p>
              <span className="relative">
                <input
                  className="border border-gray-300 p-1.5 w-full pl-8 text-sm"
                  type="text"
                  placeholder="Location"
                  value={userProfile?.introduce.location}
                />
                <span className="absolute left-0 top-1/2 -translate-y-1/2 p-1.5 text-gray-400">
                  <i className="fa-solid fa-location-dot"></i>
                </span>
              </span>
            </div>

            <div className="info-edit_name w-full">
              <p className="font-semibold text-[10px] mb-1">Email</p>
              <span className="relative">
                <input
                  className="border border-gray-300 p-1.5 w-full pl-8 text-sm"
                  type="text"
                  placeholder="Email"
                  value={userProfile?.introduce.email}
                />
                <span className="absolute left-0 top-1/2 -translate-y-1/2 p-1.5 text-gray-400">
                  <i className="fa-solid fa-envelope"></i>
                </span>
              </span>
            </div>

            <div className="info-edit_name w-full">
              <p className="font-semibold text-[10px] mb-1">Phone number</p>
              <span className="relative">
                <input
                  className="border border-gray-300 p-1.5 w-full pl-8 text-sm"
                  type="text"
                  placeholder="Phone number"
                  value={userProfile?.introduce.phoneNumber}
                />
                <span className="absolute left-0 top-1/2 -translate-y-1/2 p-1.5 text-gray-400">
                  <i className="fa-solid fa-phone"></i>
                </span>
              </span>
            </div>

            <div className="info-edit_name w-full">
              <p className="font-semibold text-[10px] mb-1">About me</p>
              <span className="relative">
                <textarea
                  className="border border-gray-300 p-1.5 w-full text-sm h-25"
                  placeholder="introduce about yourself"
                  value={userProfile?.introduce.introduceSelf}
                />
              </span>
            </div>

            <div className="button-submit flex justify-end gap-2 max-sm:flex-wrap">
              <Button
                className="w-30 max-sm:w-full"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "1px solid black",
                  padding: "10px",
                }}
                onClick={() => {}}
              >
                Cancel
              </Button>
              <Button
                className="w-30 max-sm:w-full"
                style={{ padding: "10px" }}
                onClick={() => {}}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <EditPhotoAvatarModal
      setPhotoImageAvatarTemp={setPhotoImageAvatarTemp}
        isOpenModalUploadImageAvatar={isOpenEditAvatarPhotoModal}
        setIsOpenModalUploadImageAvatar={setIsOpenEditAvatarPhotoModal}
      />
    </>
  );
};

export default EditProfileModal;
