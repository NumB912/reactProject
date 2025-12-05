// EditProfileModal.tsx
import React, { useEffect, useState } from "react";
import { Button } from "../../../../component/UI";
import { ProfileUser } from "../../../../interface/Profile";
import { EditPhotoAvatarModal } from "./EditPhotoAvatarModal";
import { Image } from "../../../../model/image";
import { Box, Modal } from "@mui/material";
import WallpaperEditor from "./EditWallpaper";

const DEFAULT_AVATAR: Image = {
  imageID: "default",
  url: "https://via.placeholder.com/400?text=No+Image",
  altText: "Default avatar",
  description: "",
  fileName: "default.png",
};

const DEFAULT_WALLPAPER: Image = {
  imageID: "default-wallpaper",
  url: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&h=600&fit=crop",
  fileName: "default-wallpaper.jpg",
  altText: "Default cover photo",
  description: "Beautiful gradient background",
};

interface EditProfileModalProp {
  isOpenEditProfileModal: boolean;
  setIsOpenEditProfileModal: (open: boolean) => void;
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
  const [profile, setProfile] = useState<ProfileUser>({
    ...userProfile,
    avatarPhoto: userProfile.avatarPhoto || DEFAULT_AVATAR, // ĐẢM BẢO LUÔN CÓ
  });
  const [isOpenEditAvatarPhotoModal, setIsOpenEditAvatarPhotoModal] =
    useState(false);
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(
    null
  );

  const [selectedWallpaperFile, setSelectedWallpaperFile] = useState<File | null>(null);
  const [errorEdit, setErrorEdit] = useState<Validate>({
    userNameErr: "",
    locationErr: "",
    phoneNumberErr: "",
    nameErr: "",
  });

  useEffect(() => {
    setProfile({
      ...userProfile,
      avatarPhoto: userProfile.avatarPhoto || DEFAULT_AVATAR,
    });
  }, [userProfile]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", profile.name || "");
    formData.append("userName", profile.userName || "");
    formData.append("location", profile.introduce.location || "");
    formData.append("phoneNumber", profile.introduce.phoneNumber || "");
    formData.append("about", profile.introduce.about || "");

    // GỬI FILE THẬT NẾU CÓ
    if (selectedAvatarFile) {
      formData.append("avatar", selectedAvatarFile, selectedAvatarFile.name);
      console.log(
        "Đang gửi file:",
        selectedAvatarFile.name,
        selectedAvatarFile.size
      );
    }

    // GỌI API
    // await fetch("/api/profile/update", { method: "POST", body: formData });
    console.log("Profile sẽ được gửi:", Object.fromEntries(formData));
    setIsOpenEditProfileModal(false);
  };

  const handleChangeProfile = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("introduce.")) {
      const key = name.split(".")[1] as keyof typeof profile.introduce;
      setProfile((prev) => ({
        ...prev,
        introduce: { ...prev.introduce, [key]: value },
      }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  // NHẬN ẢNH + FILE TỪ MODAL
  const handleAvatarApply = (image: Image | null, file: File | null) => {
    setProfile((prev) => ({
      ...prev,
      avatarPhoto: image || DEFAULT_AVATAR,
    }));
    setSelectedAvatarFile(file);
  };


const handleWallpaperChange = (image: Image | null, file: File | null) => {
  setProfile(prev => ({
    ...prev,
    wallpaperPhoto: image ?? DEFAULT_WALLPAPER, 
  }));
  setSelectedWallpaperFile(file);
};

  return (
    <>
      <Modal
        open={isOpenEditProfileModal}
        onClose={() => setIsOpenEditProfileModal(false)}
      >
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl outline-none max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
         <WallpaperEditor
          currentWallpaper={profile.wallpaperPhoto}
          onApply={handleWallpaperChange}
        />
          <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>

          <form
            onSubmit={handleSaveProfile}
            className="grid md:grid-cols-[240px_1fr] gap-8"
          >
            {/* Avatar */}
            <div className="flex justify-center">
              <div
                className="relative w-60 h-60 rounded-full overflow-hidden cursor-pointer ring-4 ring-gray-200 hover:ring-gray-300 group"
                onClick={() => setIsOpenEditAvatarPhotoModal(true)}
              >
                <img
                  src={profile.avatarPhoto.url}
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

            {/* Form fields - giữ nguyên như bạn */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block font-semibold text-xs mb-1 text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile?.name || ""}
                  onChange={handleChangeProfile}
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

              {/* Username */}
              <div>
                <label className="block font-semibold text-xs mb-1 text-gray-700">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    @
                  </span>
                  <input
                    type="text"
                    name="userName"
                    value={profile?.userName || ""}
                    onChange={handleChangeProfile}
                    placeholder="username"
                    className={`w-full pl-10 pr-3 py-2 border rounded-md text-sm
                      ${
                        errorEdit.userNameErr
                          ? "border-red-500"
                          : "border-gray-300"
                      }
                      focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                {errorEdit.userNameErr && (
                  <p className="text-red-500 text-xs italic mt-1">
                    {errorEdit.userNameErr}
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block font-semibold text-xs mb-1 text-gray-700">
                  Location
                </label>
                <div className="relative">
                  <i className="fa-solid fa-location-dot absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    name="introduce.location"
                    value={profile?.introduce.location || ""}
                    onChange={handleChangeProfile}
                    placeholder="Where are you from?"
                    className={`w-full pl-10 pr-3 py-2 border rounded-md text-sm
                      ${
                        errorEdit.locationErr
                          ? "border-red-500"
                          : "border-gray-300"
                      }
                      focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block font-semibold text-xs mb-1 text-gray-700">
                  Phone number
                </label>
                <div className="relative">
                  <i className="fa-solid fa-phone absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    name="introduce.phoneNumber"
                    value={profile?.introduce.phoneNumber || ""}
                    onChange={handleChangeProfile}
                    placeholder="+1 234 567 8900"
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

              {/* About Me */}
              <div className="md:col-span-2">
                <label className="block font-semibold text-xs mb-1 text-gray-700">
                  About me
                </label>
                <textarea
                  name="introduce.about"
                  value={profile?.introduce.about || ""}
                  onChange={handleChangeProfile}
                  placeholder="Tell us about yourself..."
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

      {/* MODAL CHỌN ẢNH */}
      <EditPhotoAvatarModal
        isOpenModalUploadImageAvatar={isOpenEditAvatarPhotoModal}
        setIsOpenModalUploadImageAvatar={setIsOpenEditAvatarPhotoModal}
        onApply={handleAvatarApply} // TRUYỀN CALLBACK MỚI
        currentPhoto={profile.avatarPhoto}
      />
      
    </>
  );
};

export default EditProfileModal;
