"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { uploadImages } from "@/utils/uploadImage";
import { useAPI } from "@/hooks/useAPI";
import ProfileInfor from "@/components/Profile/ProfileInfor";
import ChangePassword from "@/components/Profile/ChangePassword";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState<any>(null);

  const { data: session, status, update } = useSession();

  const { API } = useAPI();

  useEffect(() => {
    if (status === "loading")
      return;

    if (!profileData)
      setProfileData(session.user);
  }, [session, session.user])

  const handleUpdateProfile = async (data) => {
    const res = await API.put('/profile', data, true, true);

    if (res.success) {
      await update({
        ...session,
        user: {
          ...session?.user,
          image: res.data.image,
        },
      });
    }
  }

  const handleChangePassword = async (data) => {
    const res = await API.post('/profile/password', data, true, true);

    if (res.success)
      return true;
  }

  if (status === "loading") {
    return "Loading...";
  }

  return (
    <div className={`xl:max-w-[770px] w-full`}>
      <div>
        <ProfileInfor data={profileData} onSubmit={handleUpdateProfile} />

        <p className="text-custom-sm mt-5 mb-9">
          Những thông tin này sẽ hiển thị trong phần tài khoản và đánh giá của bạn
        </p>

        <ChangePassword onSubmit={handleChangePassword} />
      </div>
    </div>
  );
};

export default ProfilePage;