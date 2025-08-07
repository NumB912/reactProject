import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "../../../component/UI";
import { Image } from "../../../interface/ImagePhotoUrl";
import { UploadPhotosHandle } from "../../../component/UploadPhotos";
import { Introduce, ProfileUser } from "../../../interface/Profile";
import { EditPhotoAvatarModal } from "./EditPhotoAvatarModal";
import { validate } from "uuid";
interface EditProfileModalProp {
  isOpenEditProfileModal: boolean;
  setIsOpenEditProfileModal: (isOpenEditProfileModal: boolean) => void;
  userProfile: ProfileUser;
}
interface Validate {
  userNameErr: string;
  locationErr: string;
  nameErr: string;
  phoneNumberErr: string;
}
const EditProfileModal = ({
  isOpenEditProfileModal,
  setIsOpenEditProfileModal,
  userProfile,
}: EditProfileModalProp) => {
  const [photoImageAvatarTemp, setPhotoImageAvatarTemp] = useState<Image>();
  const [profile, setProfile] = useState<ProfileUser>(userProfile);
  const [isOpenEditAvatarPhotoModal, setIsOpenEditAvatarPhotoModal] =
    useState<boolean>(false);
  const [errorEdit, setErrorEdit] = useState<Validate>({
    userNameErr: "",
    locationErr: "",
    phoneNumberErr: "",
    nameErr: "",
  });

  useEffect(() => {
    if (!userProfile) {
      return;
    }

    setProfile(userProfile);
  }, [userProfile]);
  const handleSaveProfile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const Errors = Validate(
      profile.name,
      profile.userName,
      profile.introduce.location,
      profile.introduce.phoneNumber
    );
    setErrorEdit(Errors);
  };

  const Validate = (
    name: string,
    userName: string,
    location: string,
    phoneNumber: string
  ): Validate => {
    let error: Validate = {
      userNameErr: "",
      locationErr: "",
      phoneNumberErr: "",
      nameErr: "",
    };
    if (name == "") {
      error.nameErr = "Fill Name";
    }

    if (location == "") {
      error.locationErr = "Fill location";
    }
    if (phoneNumber == "") {
      error.phoneNumberErr = "Fill phone number";
    } else if (!/^\d+(\.\d+)?$/.test(phoneNumber)) {
      error.phoneNumberErr = "number";
    }

    return error;
  };

  const handleChangeProfile = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (name.startsWith("introduce.")) {
      const key = name.split(".")[1] as keyof Introduce;
      setProfile((prev) => ({
        ...prev,
        introduce: {
          ...prev.introduce,
          [key]: value,
        },
      }));
    } else {
      setProfile((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleChangeImageAvatar = (image: Image) => {
    setProfile((prev) => ({
      ...prev,
      avatarPhoto: image,
    }));
  };

  return (
    <>
      <Modal
        isOpen={isOpenEditProfileModal}
        onClose={() => {
          setIsOpenEditProfileModal(false);
        }}
        zIndex={100}
        styleContainer=" max-md:w-full"
      >
        <div>
          <form
            onSubmit={handleSaveProfile}
            className="grid w-full p-5 gap-10 grid-cols-[200px_1fr] min-md:min-w-[800px] max-md:grid-cols-1 max-md:w-full max-md:gap-5"
          >
            <div className="profile-edit-img w-full relative">
              <div
                className="relative w-full aspect-square rounded-full overflow-hidden cursor-pointer max-md:max-w-[200px] max-md:left-1/2 max-md:top-1/2 max-md:-translate-x-1/2 max-md:-translate-y-1/2"
                onClick={(e) => {
                  setIsOpenEditAvatarPhotoModal(true);
                }}
              >
                <img
                  src={
                    profile
                      ? profile.avatarPhoto.url
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

            <div className="info-edit w-full grid grid-cols-2 gap-10">
              <div className="info-edit_name w-full">
                <p className="font-semibold text-[10px] mb-1">Name</p>
                <input
                  className={`border border-gray-300 p-1.5 w-full text-sm ${
                    errorEdit.nameErr && "border-1 border-red-300"
                  }`}
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={profile?.name}
                  onChange={handleChangeProfile}
                />
                {errorEdit.nameErr && (
                  <span className="text-sm italic text-red-500">
                    {errorEdit.nameErr}
                  </span>
                )}
              </div>

              <div className={`info-edit_name w-full`}>
                <p className="font-semibold text-[10px] mb-1">Username</p>
                <span className="relative">
                  <input
                    className={`border border-gray-300 p-1.5 w-full pl-8 text-sm  ${
                      errorEdit.userNameErr && "border-2 border-red-300"
                    }`}
                    type="text"
                    name="userName"
                    placeholder="Username"
                    value={profile?.userName}
                    onChange={handleChangeProfile}
                  />
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 p-1.5 text-gray-400">
                    @
                  </span>
                </span>
                {errorEdit.userNameErr && <span>{errorEdit.userNameErr}</span>}
              </div>

              <div className="info-edit_name w-full">
                <p className="font-semibold text-[10px] mb-1">Location</p>
                <span className="relative">
                  <input
                    className={`border border-gray-300 p-1.5 w-full pl-8 text-sm  ${
                      errorEdit.locationErr && "border-2 border-red-300"
                    }`}
                    type="text"
                    placeholder="Location"
                    name="introduce.location"
                    value={profile?.introduce.location}
                    onChange={handleChangeProfile}
                  />
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 p-1.5 text-gray-400">
                    <i className="fa-solid fa-location-dot"></i>
                  </span>
                </span>
                {errorEdit.locationErr && (
                  <span className="text-sm italic text-red-500">
                    {errorEdit.locationErr}
                  </span>
                )}
              </div>

              <div className="info-edit_name w-full">
                <p className="font-semibold text-[10px] mb-1">Phone number</p>
                <span className="relative">
                  <input
                    className={`border border-gray-300 p-1.5 w-full pl-8 text-sm  ${
                      errorEdit.phoneNumberErr && "border-2 border-red-300"
                    }`}
                    type="text"
                    placeholder="Phone number"
                    name="introduce.phoneNumber"
                    value={profile?.introduce.phoneNumber}
                    onChange={handleChangeProfile}
                  />
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 p-1.5 text-gray-400">
                    <i className="fa-solid fa-phone"></i>
                  </span>
                </span>
                {errorEdit.phoneNumberErr && (
                  <span className="text-sm italic text-red-500">
                    {errorEdit.phoneNumberErr}
                  </span>
                )}
              </div>

              <div className="info-edit_name w-full col-span-2">
                <p className="font-semibold text-[10px] mb-1">About me</p>
                <span className="relative">
                  <textarea
                    className="border border-gray-300 p-1.5 w-full text-sm h-25"
                    placeholder="introduce about yourself"
                    name="introduce.about"
                    value={profile?.introduce.about}
                    onChange={handleChangeProfile}
                  />
                </span>
              </div>

              <div className="button-submit flex justify-end gap-2 max-sm:flex-wrap col-span-2">
                <Button
                  className="w-30 max-sm:w-full"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    border: "1px solid black",
                    padding: "10px",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="w-30 max-sm:w-full"
                  style={{ padding: "10px" }}
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Modal>

      <EditPhotoAvatarModal
        setPhoto={handleChangeImageAvatar}
        isOpenModalUploadImageAvatar={isOpenEditAvatarPhotoModal}
        setIsOpenModalUploadImageAvatar={setIsOpenEditAvatarPhotoModal}
      />
    </>
  );
};

export default EditProfileModal;
