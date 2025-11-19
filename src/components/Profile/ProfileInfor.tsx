import { uploadImages } from '@/utils/uploadImage';
import Image from 'next/image'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

interface ProfileInforProps {
  data: any,
  onSubmit: (data) => Promise<void>;
}

const ProfileInfor = ({ data, onSubmit } : ProfileInforProps) => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    image: ""
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setProfileData({
        name: data.name,
        email: data.email,
        phone: data.phone,
        image: data.image
      });

      setPreviewImage(data.image);
    }
  }, [data]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!checkForm() || !onSubmit) {
      return;
    }

    let updatedProfile = { ...profileData };

    if (imageFile != null) {
      const imageUrls = await uploadImages([imageFile]);
      updatedProfile = {
        ...updatedProfile,
        image: imageUrls[0],
      };
    }

    onSubmit(updatedProfile);
  };

  useEffect(() => {
    checkForm();
  }, [profileData])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFile = files[0];
    const newPreview = URL.createObjectURL(newFile);

    setImageFile(newFile);
    setPreviewImage(newPreview);
  };

  const handleRemoveImage = () => {
    setPreviewImage(data.image);
    setImageFile(null);
    setProfileData((prev) => ({
      ...prev,
      image: data.image,
    }));
  };

  const checkForm = () => {
    if (!profileData.name.trim()) {
      setError("Vui lòng nhập tên!");
      return false;
    }

    const phone = profileData.phone.trim().replace(/[\s-]/g, "");
    const phoneRegex = /^(?:\+84|0)(?:3|5|7|8|9)\d{8}$/;
    if (!phoneRegex.test(phone)) {
      setError("Số điện thoại không hợp lệ");
      return;
    }

    setError(null);
    return true;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-4 sm:p-8.5">
      <p className="font-medium text-xl sm:text-2xl text-dark mb-7">
        Thông tin cá nhân
      </p>
      <div className="flex flex-col md:flex-row-reverse gap-2 justify-between mb-5">
        <div className="flex flex-col items-center gap-2 px-4 md:w-1/2">
          <div className="relative group rounded-lg overflow-hidden w-full h-full max-w-[258px] max-h-[258px]">
            <Image
              src={previewImage || "/images/default-avatar.jpg"}
              alt={`avatar`}
              width={360}
              height={360}
              className="w-full h-full aspect-square object-cover rounded-full"
            />
            {imageFile && (
              <button
                type="button"
                onClick={() => handleRemoveImage()}
                className="absolute top-1 right-1 bg-dark/50 text-white rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition"
              >
                ✕
              </button>
            )}
          </div>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-6
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-medium
                file:bg-gray-1 file:text-gray-7
                hover:file:bg-gray-2"
          />
        </div>

        <div className="flex flex-col w-full md:w-1/2">
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2.5">
              Họ tên <span className="text-red">*</span>
            </label>

            <input
              type="text"
              name="name"
              id="name"
              value={profileData.name}
              onChange={handleChange}
              className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block mb-2.5">
              Email <span className="text-red">*</span>
            </label>

            <input
              type="email"
              name="email"
              id="email"
              value={profileData.email}
              disabled
              className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="phone" className="block mb-2.5">
              SĐT <span className="text-red">*</span>
            </label>

            <input
              type="text"
              name="phone"
              id="phone"
              value={profileData.phone}
              onChange={handleChange}
              className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-primary/20"
            />
          </div>
          {error && (
            <p className="text-red mb-5">{error}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex font-medium text-white bg-primary py-3 px-7 rounded-md ease-out duration-200 hover:bg-primary-dark"
      >
        Lưu
      </button>
    </form>
  )
}

export default ProfileInfor