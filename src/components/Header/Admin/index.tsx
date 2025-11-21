"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import UserDropdown from "../UserDropdown";
import { adminMenuData, menuData } from "../menuData";
import Dropdown from "../Dropdown";

const AdminHeader = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);

  const { data: session } = useSession();

  const menuItem = [
    { title: "Tài khoản của tôi", path: "/account/profile" },
    {
      title: "Đăng xuất", path: "#", action: () => {
        signOut({ callbackUrl: "/" });
      }
    },
  ]

  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
  });

  return (
    <header className={`fixed left-0 top-0 w-full z-999 bg-primary transition-all ease-in-out duration-300 shadow`}>
      <div className="border-t border-gray-3">
        <div className="flex flex-col max-w-[1170px] mx-auto px-4 sm:px-7.5 xl:px-0">
          <div className="flex items-center justify-between gap-5">
            <Link className="flex-shrink-0" href="/">
              <Image
                src="/images/logo/logo.png"
                alt="Logo"
                width={80}
                height={80}
              />
            </Link>

            <div className="w-full flex items-center justify-between">
              {/* <!--=== Main Nav Start ===--> */}
              <div
                className={`w-[288px] absolute right-4 top-full xl:static xl:w-auto h-0 xl:h-auto invisible xl:visible xl:flex items-center justify-between ${navigationOpen &&
                  `!visible bg-white shadow-lg border border-gray-3 !h-auto max-h-[400px] overflow-y-scroll rounded-md p-5`
                  }`}
              >
                {/* <!-- Main Nav Start --> */}
                <nav>
                  <ul className="flex xl:items-center flex-col xl:flex-row gap-5 xl:gap-6">
                    {adminMenuData.map((menuItem, i) =>
                      menuItem.submenu ? (
                        <Dropdown
                          key={i}
                          menuItem={menuItem}
                          stickyMenu={stickyMenu}
                        />
                      ) : (
                        <li
                          key={i}
                          className="group relative before:w-0 before:h-[3px] before:bg-primary-hover before:absolute before:left-0 before:top-0 before:rounded-b-[3px] before:ease-out before:duration-200 hover:before:w-full "
                        >
                          <Link
                            href={menuItem.path}
                            className={`hover:text-primary-hover text-custom-sm font-medium text-white flex xl:py-4`}
                          >
                            {menuItem.title}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </nav>
                {/* //   <!-- Main Nav End --> */}
              </div>
              {/* // <!--=== Main Nav End ===--> */}
            </div>

            <div className="flex w-full min-w-[200px] lg:w-auto justify-end items-center gap-5">
              <UserDropdown user={session?.user} menuItem={menuItem} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
