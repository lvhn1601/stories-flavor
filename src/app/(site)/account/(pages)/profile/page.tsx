"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

const ProfilePage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return "Loading...";
  }

  return (
    <div
      className={`xl:max-w-[770px] w-full`}
    >
      <form>
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-8.5">
          <p className="font-medium text-xl sm:text-2xl text-dark mb-7">
            Thông tin cá nhân
          </p>
          <div className="flex flex-col md:flex-row-reverse gap-2 justify-between mb-5">
            <div className="flex flex-col gap-2 px-4">
              <Image
                src={session?.user?.image || "/images/user/user-1.jpg"}
                alt={`avatar`}
                width={360}
                height={360}
                className="w-full h-full aspect-square object-cover rounded-full"
              />

              <input
                type="file"
                multiple
                accept="image/*"
                // onChange={handleImageUpload}
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
                  value={session.user.name}
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
                  value={session.user.email}
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
                  value={session.user.phone}
                  className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex font-medium text-white bg-primary py-3 px-7 rounded-md ease-out duration-200 hover:bg-primary-dark"
          >
            Lưu
          </button>
        </div>

        <p className="text-custom-sm mt-5 mb-9">
          Những thông tin này sẽ hiển thị trong phần tài khoản và đánh giá của bạn
        </p>

        <p className="font-medium text-xl sm:text-2xl text-dark mb-7">
          Đổi mật khẩu
        </p>

        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-8.5">
          <div className="mb-5">
            <label htmlFor="oldPassword" className="block mb-2.5">
              Mật khẩu cũ
            </label>

            <input
              type="password"
              name="oldPassword"
              id="oldPassword"
              autoComplete="on"
              className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="newPassword" className="block mb-2.5">
              Mật khẩu mới
            </label>

            <input
              type="password"
              name="newPassword"
              id="newPassword"
              autoComplete="on"
              className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="confirmNewPassword"
              className="block mb-2.5"
            >
              Xác nhận mật khẩu mới
            </label>

            <input
              type="password"
              name="confirmNewPassword"
              id="confirmNewPassword"
              autoComplete="on"
              className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <button
            type="submit"
            className="inline-flex font-medium text-white bg-primary py-3 px-7 rounded-md ease-out duration-200 hover:bg-primary-dark"
          >
            Đổi mật khẩu
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;