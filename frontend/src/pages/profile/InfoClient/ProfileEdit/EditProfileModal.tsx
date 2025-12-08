// EditProfileModal.tsx
import React, { useEffect, useState } from "react";
import { Button } from "../../../../component/UI";
import { profile } from "../../../../interface/Profile";
import { EditPhotoAvatarModal } from "./EditPhotoAvatarModal";
import { Box, Modal } from "@mui/material";
import WallpaperEditor from "./EditWallpaper";
import { formatUrlImg } from "../../../../utils/urlFormat";
import { Image } from "../../../../model/image";
import useSingleUploadPhoto from "../../../../hook/useUploadPhoto";
import api from "../../../../../API/api";
const DEFAULT_AVATAR: Image = {
  image:{
     url: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&h=600&fit=crop",
     alt:""
  }
};

interface EditProfileModalProp {
  isOpenEditProfileModal: boolean;
  setIsOpenEditProfileModal: (open: boolean) => void;
  userProfile: profile;
  onSuccess:(profile:profile)=>void;
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
  onSuccess
}: EditProfileModalProp) => {
  const [profile, setProfile] = useState<profile>({
    ...userProfile,
    image: userProfile.image || DEFAULT_AVATAR, 
  });
  const [isOpenEditAvatarPhotoModal, setIsOpenEditAvatarPhotoModal] =
    useState(false);
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(
    null
  );

  const [name,setName] = useState<string>(profile.name)
  const [phone,setPhone] = useState<string>(profile.phone)
  const [bio,setBio] = useState<string>(profile.bio)


  const [errorEdit, setErrorEdit] = useState<Validate>({
    userNameErr: "",
    locationErr: "",
    phoneNumberErr: "",
    nameErr: "",
  });


  useEffect(() => {
    setProfile({
      ...userProfile,
      image: userProfile.image || DEFAULT_AVATAR,
    });
  }, [userProfile]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name|| "");
    formData.append("phone", phone || "");
    formData.append("bio", bio || "");

    if (selectedAvatarFile) {
      formData.append("avatar", selectedAvatarFile);
    }

    api.put("/user/profile",formData).then((res)=>{
      console.log()
      onSuccess(res.data.data)
    }).catch((error)=>{
      console.error(error)
    })

    setIsOpenEditProfileModal(false);
  };

  const handleAvatarApply = (image: Image | null, file: File | null) => {
    setProfile((prev) => ({
      ...prev,
       ...image || DEFAULT_AVATAR,
    }));
    setSelectedAvatarFile(file);
  };


// const handleWallpaperChange = (image: Image | null, file: File | null) => {
//   setProfile(prev => ({
//     ...prev,
//     wallpaperPhoto: image ?? DEFAULT_WALLPAPER, 
//   }));
//   setSelectedWallpaperFile(file);
// };

  return (
    <>
      <Modal
        open={isOpenEditProfileModal}
        onClose={() => setIsOpenEditProfileModal(false)}
      >
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl outline-none max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
         {/* <WallpaperEditor
          currentWallpaper={profile.wallpaper}
          onApply={handleWallpaperChange}
        /> */}
          <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>

          <form
            onSubmit={handleSaveProfile}
            className="grid md:grid-cols-[240px_1fr] gap-8"
          >
            <div className="flex justify-center">
              <div
                className="relative w-60 h-60 rounded-full overflow-hidden cursor-pointer ring-4 ring-gray-200 hover:ring-gray-300 group"
                onClick={() => setIsOpenEditAvatarPhotoModal(true)}
              >
                <img
                  src={profile.image.url}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition">
                  <i className="fa-solid fa-camera text-4xl mb-2" />
                  <p className="font-medium">Change Photo</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-xs mb-1 text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name || ""}
                  onChange={(e)=>{
                    setName(e.target.value)
                  }}
                  placeholder="Your name"
                  className={`w-full px-3 py-2 border rounded-md text-sm transition-colors
                    ${errorEdit.nameErr ? "border-red-500" : "border-gray-300"} 
                    focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errorEdit.nameErr && (
                  <p className="text-red-500 text-xs italic mt-1">
                    {errorEdit.nameErr}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-xs mb-1 text-gray-700">
                  Phone number
                </label>
                <div className="relative">
                  <i className="fa-solid fa-phone absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    name="phone"
                    value={phone || ""}
                    placeholder="+1 234 567 8900"
                    onChange={(e)=>{
                      setPhone(e.target.value)
                    }}
                    className={`w-full pl-10 pr-3 py-2 border rounded-md text-sm
                      ${
                        errorEdit.phoneNumberErr
                          ? "border-red-500"
                          : "border-gray-300"
                      }
                      focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                {errorEdit.phoneNumberErr && (
                  <p className="text-red-500 text-xs italic mt-1">
                    {errorEdit.phoneNumberErr}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block font-semibold text-xs mb-1 text-gray-700">
                  About me
                </label>
                <textarea
                  name="introduce.about"
                  value={bio|| ""}
                  placeholder="Tell us about yourself..."
                  onChange={(e)=>{
                    setBio(e.target.value)
                  }}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>

            <div className="md:col-span-2 flex justify-end gap-4 pt-4">
              <Button onClick={() => setIsOpenEditProfileModal(false)}>
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                className="bg-black hover:bg-gray-800"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Box>
      </Modal>

      <EditPhotoAvatarModal
        isOpenModalUploadImageAvatar={isOpenEditAvatarPhotoModal}
        setIsOpenModalUploadImageAvatar={setIsOpenEditAvatarPhotoModal}
        onApply={handleAvatarApply} 
        currentPhoto={{image:profile.image}}
      />
      
    </>
  );
};

export default EditProfileModal;
