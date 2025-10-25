"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import CustomSelect from "./CustomSelect";
import { menuData } from "./menuData";
import Dropdown from "./Dropdown";
import { useAppSelector } from "@/redux/store";
import { useSelector } from "react-redux";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import data from "../Home/Categories/categoryData";
import UserDropdown from "./UserDropdown";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const { openCartModal } = useCartModalContext();

  const { data: session } = useSession();

  const menuItem = [
    { title: "Tài khoản của tôi", path: "/profile" },
    { title: "Đơn mua", path: "/orders" },
    {
      title: "Đăng xuất", path: "#", action: () => {
        signOut({ callbackUrl: "/" });
      }
    },
  ]

  const handleOpenCartModal = () => {
    openCartModal();
  };

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
          {/* <!-- header top start --> */}
          <div className="w-full flex gap-5 items-center justify-end ease-out duration-200 mt-1">

            {/* <!-- header top right --> */}
            <div className="flex w-full lg:w-auto items-center gap-7.5">
              <div className="hidden xl:flex items-center gap-3.5">
                <p className="font-medium text-custom-xs text-white">
                  Tiếng Việt
                </p>
              </div>

              {/* <!-- divider --> */}
              <span className="hidden xl:block w-px h-7.5 bg-gray-4"></span>

              <div className="flex w-full lg:w-auto justify-between items-center gap-5">
                {session?.user ? (
                  <UserDropdown user={session.user} menuItem={menuItem} />
                ) : (
                  <div className="flex items-center gap-5">
                    <Link href="/signin" className="flex items-center gap-2.5">
                      <p className="font-medium text-custom-xs text-white">
                        Đăng ký
                      </p>
                    </Link>
                    <Link href="/signin" className="flex items-center gap-2.5">
                      <div className="font-medium border bg-primary-dark rounded-md px-2 py-1 text-custom-xs text-white">
                        Đăng nhập
                      </div>
                    </Link>
                  </div>
                )}

                {/* <!-- Hamburger Toggle BTN --> */}
                <button
                  id="Toggle"
                  aria-label="Toggler"
                  className="xl:hidden block"
                  onClick={() => setNavigationOpen(!navigationOpen)}
                >
                  <span className="block relative cursor-pointer w-5.5 h-5.5">
                    <span className="du-block absolute right-0 w-full h-full">
                      <span
                        className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-[0] ${!navigationOpen && "!w-full delay-300"
                          }`}
                      ></span>
                      <span
                        className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-150 ${!navigationOpen && "!w-full delay-400"
                          }`}
                      ></span>
                      <span
                        className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-200 ${!navigationOpen && "!w-full delay-500"
                          }`}
                      ></span>
                    </span>

                    <span className="block absolute right-0 w-full h-full rotate-45">
                      <span
                        className={`block bg-dark rounded-sm ease-in-out duration-200 delay-300 absolute left-2.5 top-0 w-0.5 h-full ${!navigationOpen && "!h-0 delay-[0] "
                          }`}
                      ></span>
                      <span
                        className={`block bg-dark rounded-sm ease-in-out duration-200 delay-400 absolute left-0 top-2.5 w-full h-0.5 ${!navigationOpen && "!h-0 dealy-200"
                          }`}
                      ></span>
                    </span>
                  </span>
                </button>
                {/* //   <!-- Hamburger Toggle BTN --> */}
              </div>
            </div>
          </div>
          {/* <!-- header top end --> */}

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
                    {menuData.map((menuItem, i) =>
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

              <div className="flex gap-4">
                <div className="max-w-[475px] w-full">
                  <form>
                    <div className="flex items-center">
                      <div className="relative max-w-[333px] sm:min-w-[333px] w-full">
                        <input
                          onChange={(e) => setSearchQuery(e.target.value)}
                          value={searchQuery}
                          type="search"
                          name="search"
                          id="search"
                          placeholder="Tìm kiếm..."
                          autoComplete="off"
                          className="w-full rounded-lg bg-gray-1 border border-gray-3 py-1 pl-4 pr-10 outline-none ease-in duration-200"
                        />

                        <button
                          id="search-btn"
                          aria-label="Search"
                          className="flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 ease-in duration-200 hover:text-primary"
                        >
                          <svg
                            className="fill-current"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M17.2687 15.6656L12.6281 11.8969C14.5406 9.28123 14.3437 5.5406 11.9531 3.1781C10.6875 1.91248 8.99995 1.20935 7.19995 1.20935C5.39995 1.20935 3.71245 1.91248 2.44683 3.1781C-0.168799 5.79373 -0.168799 10.0687 2.44683 12.6844C3.71245 13.95 5.39995 14.6531 7.19995 14.6531C8.91558 14.6531 10.5187 14.0062 11.7843 12.8531L16.4812 16.65C16.5937 16.7344 16.7343 16.7906 16.875 16.7906C17.0718 16.7906 17.2406 16.7062 17.3531 16.5656C17.5781 16.2844 17.55 15.8906 17.2687 15.6656ZM7.19995 13.3875C5.73745 13.3875 4.38745 12.825 3.34683 11.7844C1.20933 9.64685 1.20933 6.18748 3.34683 4.0781C4.38745 3.03748 5.73745 2.47498 7.19995 2.47498C8.66245 2.47498 10.0125 3.03748 11.0531 4.0781C13.1906 6.2156 13.1906 9.67498 11.0531 11.7844C10.0406 12.825 8.66245 13.3875 7.19995 13.3875Z"
                              fill=""
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <button
                  onClick={handleOpenCartModal}
                  className="flex items-center gap-2.5"
                >
                  <span className="inline-block relative">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.29266 2.7512C1.43005 2.36044 1.8582 2.15503 2.24896 2.29242L2.55036 2.39838C3.16689 2.61511 3.69052 2.79919 4.10261 3.00139C4.54324 3.21759 4.92109 3.48393 5.20527 3.89979C5.48725 4.31243 5.60367 4.76515 5.6574 5.26153C5.66124 5.29706 5.6648 5.33321 5.66809 5.36996L17.1203 5.36996C17.9389 5.36995 18.7735 5.36993 19.4606 5.44674C19.8103 5.48584 20.1569 5.54814 20.4634 5.65583C20.7639 5.76141 21.0942 5.93432 21.3292 6.23974C21.711 6.73613 21.7777 7.31414 21.7416 7.90034C21.7071 8.45845 21.5686 9.15234 21.4039 9.97723L21.3935 10.0295L21.3925 10.0341L20.8836 12.5033C20.7339 13.2298 20.6079 13.841 20.4455 14.3231C20.2731 14.8346 20.0341 15.2842 19.6076 15.6318C19.1811 15.9793 18.6925 16.1226 18.1568 16.1882C17.6518 16.25 17.0278 16.25 16.2862 16.25L10.8804 16.25C9.53464 16.25 8.44479 16.25 7.58656 16.1283C6.69032 16.0012 5.93752 15.7285 5.34366 15.1022C4.79742 14.526 4.50529 13.9144 4.35897 13.0601C4.22191 12.2598 4.20828 11.2125 4.20828 9.75996V7.03832C4.20828 6.29837 4.20726 5.80316 4.16611 5.42295C4.12678 5.0596 4.05708 4.87818 3.96682 4.74609C3.87876 4.61723 3.74509 4.4968 3.44186 4.34802C3.11902 4.18961 2.68026 4.03406 2.01266 3.79934L1.75145 3.7075C1.36068 3.57012 1.15527 3.14197 1.29266 2.7512ZM5.70828 6.86996L5.70828 9.75996C5.70828 11.249 5.72628 12.1578 5.83744 12.8068C5.93933 13.4018 6.11202 13.7324 6.43219 14.0701C6.70473 14.3576 7.08235 14.5418 7.79716 14.6432C8.53783 14.7482 9.5209 14.75 10.9377 14.75H16.2406C17.0399 14.75 17.5714 14.7487 17.9746 14.6993C18.3573 14.6525 18.5348 14.571 18.66 14.469C18.7853 14.3669 18.9009 14.2095 19.024 13.8441C19.1537 13.4592 19.2623 12.9389 19.4237 12.156L19.9225 9.73591L19.9229 9.73369C20.1005 8.84376 20.217 8.2515 20.2444 7.80793C20.2704 7.38648 20.2043 7.23927 20.1429 7.15786C20.1367 7.15259 20.0931 7.11565 19.9661 7.07101C19.8107 7.01639 19.5895 6.97049 19.2939 6.93745C18.6991 6.87096 17.9454 6.86996 17.089 6.86996H5.70828Z"
                        fill="#FFFFFF"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.2502 19.5C5.2502 20.7426 6.25756 21.75 7.5002 21.75C8.74285 21.75 9.7502 20.7426 9.7502 19.5C9.7502 18.2573 8.74285 17.25 7.5002 17.25C6.25756 17.25 5.2502 18.2573 5.2502 19.5ZM7.5002 20.25C7.08599 20.25 6.7502 19.9142 6.7502 19.5C6.7502 19.0857 7.08599 18.75 7.5002 18.75C7.91442 18.75 8.2502 19.0857 8.2502 19.5C8.2502 19.9142 7.91442 20.25 7.5002 20.25Z"
                        fill="#FFFFFF"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.25 19.5001C14.25 20.7427 15.2574 21.7501 16.5 21.7501C17.7426 21.7501 18.75 20.7427 18.75 19.5001C18.75 18.2574 17.7426 17.2501 16.5 17.2501C15.2574 17.2501 14.25 18.2574 14.25 19.5001ZM16.5 20.2501C16.0858 20.2501 15.75 19.9143 15.75 19.5001C15.75 19.0859 16.0858 18.7501 16.5 18.7501C16.9142 18.7501 17.25 19.0859 17.25 19.5001C17.25 19.9143 16.9142 20.2501 16.5 20.2501Z"
                        fill="#FFFFFF"
                      />
                    </svg>

                    {/* <span className="flex items-center justify-center font-medium text-2xs absolute -right-2 -top-2.5 bg-primary-hover w-4.5 h-4.5 rounded-full text-white">
                      {product.length}
                    </span> */}
                  </span>
                </button>
              </div>
              {/* // <!--=== Main Nav End ===--> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
