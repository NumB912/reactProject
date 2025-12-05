import { create } from "zustand";

export interface UploadPhoto {
  id: string;
  url: string;
  description: string;
  file: File;
}

interface UploadPhotoStore {
  photos: UploadPhoto[];
  max: number;
  setMax: (max: number) => void;
  addPhotos: (files: File[]) => void;
  removePhoto: (index: number) => void;
  updateDescription: (index: number, value: string) => void;
  clearPhotos: () => void;
}

export const useUploadPhotoStore = create<UploadPhotoStore>((set, get) => ({
  photos: [],
  max: 10,
  setMax: (max) => set({ max }),

  addPhotos: (files: File[]) => {
    const { photos, max } = get();

    const validFiles = files.filter((file) =>
      ["image/jpeg", "image/png", "image/gif"].includes(file.type)
    );

    if (photos.length + validFiles.length > max) {
      alert(`Chỉ được tải tối đa ${max} ảnh.`);
      return;
    }

    const newPhotos: UploadPhoto[] = validFiles.map((file) => ({
      id: crypto.randomUUID(),
      url: URL.createObjectURL(file),
      description: "",
      file,
    }));

    set({ photos: [...photos, ...newPhotos] });
  },

  removePhoto: (index: number) => {
    const { photos } = get();
    const removed = photos[index];
    if (removed) {
      URL.revokeObjectURL(removed.url);
    }
    const updated = photos.filter((_, i) => i !== index);
    set({ photos: updated });
  },

  updateDescription: (index: number, value: string) => {
    const { photos } = get();
    const updated = photos.map((photo, i) =>
      i === index ? { ...photo, description: value } : photo
    );
    set({ photos: updated });
  },

  clearPhotos: () => {
    const { photos } = get();
    photos.forEach((p) => URL.revokeObjectURL(p.url));
    set({ photos: [] });
  },
}));
