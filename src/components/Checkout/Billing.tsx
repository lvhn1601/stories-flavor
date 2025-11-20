import { getProvinceName, provinceDatas } from "@/utils/provinces";
import React, { useEffect, useState } from "react";

const Billing = ({ data, setData, addresses, onSelect }) => {
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [newAddress, setNewAddress] = useState(false);

  useEffect(() => {
    if (addresses.length > 0)
      setSelectedAddress(addresses[0].id)
  }, [addresses])

  const handleSelect = (id) => {
    setSelectedAddress(id);

    if (onSelect)
      onSelect(id);
  }

  const handleNewAddress = (e) => {
    e.preventDefault();
    handleSelect(null);
    setNewAddress(true);
  }

  return (
    <div>
      <div className="bg-white shadow-lg rounded-[10px] p-4 sm:p-8.5">
        <h2 className="font-medium text-dark text-xl sm:text-2xl mb-5.5">
          Thông tin khách hàng
        </h2>
        <div className="flex flex-col gap-2 mb-5">
          {addresses.map((address) => (
            <div
              key={address.id}
              onClick={(e) => {
                e.preventDefault();
                handleSelect(address.id);
              }}
              className={`flex flex-col gap-4 rounded-xl shadow-md p-4 hover:bg-gray-1 cursor-pointer
                ${selectedAddress === address.id && "border-2 border-primary text-primary"}`}
            >
              <p className="flex items-center gap-2.5 text-custom-sm">
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.0001 0.9375C7.03259 0.9375 5.4376 2.53249 5.4376 4.5C5.4376 6.46751 7.03259 8.0625 9.0001 8.0625C10.9676 8.0625 12.5626 6.46751 12.5626 4.5C12.5626 2.53249 10.9676 0.9375 9.0001 0.9375ZM6.5626 4.5C6.5626 3.15381 7.65391 2.0625 9.0001 2.0625C10.3463 2.0625 11.4376 3.15381 11.4376 4.5C11.4376 5.84619 10.3463 6.9375 9.0001 6.9375C7.65391 6.9375 6.5626 5.84619 6.5626 4.5Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.0001 9.1875C7.26494 9.1875 5.66629 9.58191 4.48169 10.2483C3.31471 10.9047 2.4376 11.8995 2.4376 13.125L2.43755 13.2015C2.4367 14.0729 2.43564 15.1665 3.39491 15.9477C3.86701 16.3321 4.52746 16.6055 5.41976 16.7861C6.31455 16.9672 7.48077 17.0625 9.0001 17.0625C10.5194 17.0625 11.6857 16.9672 12.5804 16.7861C13.4727 16.6055 14.1332 16.3321 14.6053 15.9477C15.5646 15.1665 15.5635 14.0729 15.5626 13.2015L15.5626 13.125C15.5626 11.8995 14.6855 10.9047 13.5185 10.2483C12.3339 9.58191 10.7353 9.1875 9.0001 9.1875ZM3.5626 13.125C3.5626 12.4865 4.02863 11.7939 5.03323 11.2288C6.0202 10.6736 7.42156 10.3125 9.0001 10.3125C10.5786 10.3125 11.98 10.6736 12.967 11.2288C13.9716 11.7939 14.4376 12.4865 14.4376 13.125C14.4376 14.1059 14.4074 14.658 13.8949 15.0753C13.617 15.3016 13.1525 15.5225 12.3573 15.6835C11.5645 15.8439 10.4808 15.9375 9.0001 15.9375C7.51943 15.9375 6.43565 15.8439 5.64294 15.6835C4.84774 15.5225 4.38319 15.3016 4.10529 15.0753C3.59284 14.658 3.5626 14.1059 3.5626 13.125Z"
                    fill=""
                  />
                </svg>
                Người nhận: {address.name}
              </p>

              <p className="flex items-center gap-2.5 text-custom-sm">
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.94471 1.41012C9.99436 1.10345 10.2843 0.895419 10.5909 0.945068C10.6099 0.948701 10.671 0.960116 10.703 0.967243C10.767 0.981496 10.8563 1.00344 10.9676 1.03586C11.1901 1.10069 11.5011 1.20749 11.8743 1.3786C12.6215 1.72116 13.6159 2.32042 14.6477 3.35227C15.6796 4.38412 16.2788 5.37848 16.6214 6.12568C16.7925 6.4989 16.8993 6.80985 16.9641 7.03243C16.9966 7.14374 17.0185 7.23301 17.0328 7.297C17.0399 7.32901 17.0451 7.3547 17.0487 7.37368L17.053 7.39708C17.1027 7.70375 16.8965 8.00564 16.5899 8.05528C16.2841 8.10479 15.996 7.89776 15.9451 7.59254C15.9436 7.58434 15.9393 7.56232 15.9347 7.54156C15.9254 7.50002 15.9094 7.43415 15.884 7.34704C15.8333 7.17279 15.7451 6.91379 15.5987 6.59453C15.3064 5.9568 14.7806 5.07616 13.8522 4.14776C12.9238 3.21936 12.0432 2.69362 11.4055 2.40125C11.0862 2.25488 10.8272 2.16673 10.653 2.11597C10.5658 2.0906 10.4563 2.06547 10.4148 2.05622C10.1096 2.00535 9.89521 1.71591 9.94471 1.41012Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.1144 3.99722C10.1997 3.69851 10.5111 3.52555 10.8098 3.61089L10.6553 4.15175C10.8098 3.61089 10.8098 3.61089 10.8098 3.61089L10.8109 3.6112L10.812 3.61153L10.8145 3.61226L10.8203 3.614L10.8352 3.61862C10.8465 3.62224 10.8606 3.62695 10.8774 3.63292C10.9111 3.64487 10.9556 3.66187 11.0102 3.68528C11.1195 3.7321 11.2688 3.80442 11.4522 3.91295C11.8193 4.13021 12.3204 4.4911 12.9092 5.07982C13.4979 5.66855 13.8588 6.16969 14.076 6.53679C14.1846 6.72018 14.2569 6.86947 14.3037 6.97874C14.3271 7.03334 14.3441 7.07786 14.3561 7.11154C14.362 7.12838 14.3667 7.1425 14.3704 7.15381L14.375 7.16865L14.3767 7.17447L14.3775 7.17697L14.3778 7.17812C14.3778 7.17812 14.3781 7.1792 13.8372 7.33373L14.3781 7.1792C14.4634 7.4779 14.2905 7.78924 13.9918 7.87458C13.6956 7.9592 13.387 7.78988 13.2986 7.49584L13.2958 7.48775C13.2918 7.47649 13.2836 7.4543 13.2697 7.4219C13.2419 7.35714 13.1916 7.25122 13.1079 7.10978C12.9407 6.82722 12.6386 6.40028 12.1137 5.87532C11.5887 5.35036 11.1618 5.04833 10.8792 4.8811C10.7378 4.79739 10.6318 4.74706 10.5671 4.71931C10.5347 4.70543 10.5125 4.69715 10.5012 4.69315L10.4931 4.69038C10.1991 4.60197 10.0298 4.29339 10.1144 3.99722Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.75559 3.30519C5.01564 2.04514 7.142 2.14093 8.01936 3.71302L8.50612 4.58522C9.07906 5.61183 8.8349 6.90714 7.99618 7.75612C7.98501 7.77142 7.92581 7.85762 7.91843 8.00823C7.90902 8.20047 7.97729 8.64506 8.66611 9.33388C9.35471 10.0225 9.79924 10.0909 9.99156 10.0816C10.1423 10.0742 10.2286 10.015 10.2439 10.0038C11.0929 9.16509 12.3882 8.92094 13.4148 9.49387L14.287 9.98063C15.8591 10.858 15.9549 12.9844 14.6948 14.2444C14.0208 14.9184 13.1246 15.5173 12.0715 15.5572C10.5108 15.6164 7.91935 15.2133 5.35301 12.647C2.78667 10.0806 2.38363 7.48922 2.4428 5.92852C2.48272 4.87537 3.08159 3.97918 3.75559 3.30519ZM7.03699 4.26127C6.58773 3.45626 5.38046 3.27131 4.55108 4.10068C3.96957 4.6822 3.59152 5.32406 3.56699 5.97114C3.51765 7.27264 3.83898 9.54196 6.14851 11.8515C8.45803 14.161 10.7273 14.4823 12.0289 14.433C12.6759 14.4085 13.3178 14.0304 13.8993 13.4489C14.7287 12.6195 14.5437 11.4123 13.7387 10.963L12.8665 10.4762C12.324 10.1735 11.5619 10.2767 11.0269 10.8117C10.9743 10.8642 10.6398 11.1764 10.0462 11.2052C9.43855 11.2348 8.703 10.9618 7.87062 10.1294C7.03796 9.29672 6.76502 8.56097 6.79478 7.95322C6.82384 7.35958 7.13601 7.02538 7.18824 6.97314C7.72323 6.43815 7.82654 5.67602 7.52375 5.13346L7.03699 4.26127Z"
                    fill=""
                  />
                </svg>
                SĐT: {address.phone}
              </p>

              <p className="flex gap-2.5 text-custom-sm">
                <svg
                  className="fill-current mt-0.5"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_100_6003)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.1875 6.38598C3.1875 3.33948 5.8286 0.9375 9 0.9375C12.1714 0.9375 14.8125 3.33948 14.8125 6.38598C14.8125 9.24433 13.0403 12.6 10.1811 13.8219C9.43046 14.1427 8.56954 14.1427 7.81891 13.8219C4.95967 12.6 3.1875 9.24433 3.1875 6.38598ZM9 2.0625C6.37241 2.0625 4.3125 4.03557 4.3125 6.38598C4.3125 8.88223 5.89157 11.7749 8.26099 12.7874C8.72925 12.9875 9.27075 12.9875 9.73901 12.7874C12.1084 11.7749 13.6875 8.88223 13.6875 6.38598C13.6875 4.03557 11.6276 2.0625 9 2.0625ZM9 5.8125C8.48223 5.8125 8.0625 6.23223 8.0625 6.75C8.0625 7.26777 8.48223 7.6875 9 7.6875C9.51777 7.6875 9.9375 7.26777 9.9375 6.75C9.9375 6.23223 9.51777 5.8125 9 5.8125ZM6.9375 6.75C6.9375 5.61091 7.86091 4.6875 9 4.6875C10.1391 4.6875 11.0625 5.61091 11.0625 6.75C11.0625 7.88909 10.1391 8.8125 9 8.8125C7.86091 8.8125 6.9375 7.88909 6.9375 6.75ZM2.69656 11.2474C2.90508 11.4777 2.88744 11.8334 2.65716 12.042C2.23139 12.4275 2.0625 12.7965 2.0625 13.125C2.0625 13.6978 2.60551 14.4036 3.92753 14.9985C5.19675 15.5697 6.98964 15.9375 9 15.9375C11.0104 15.9375 12.8032 15.5697 14.0725 14.9985C15.3945 14.4036 15.9375 13.6978 15.9375 13.125C15.9375 12.7966 15.7686 12.4275 15.3428 12.042C15.1126 11.8334 15.0949 11.4777 15.3034 11.2474C15.512 11.0172 15.8677 10.9995 16.098 11.208C16.6702 11.7262 17.0625 12.3758 17.0625 13.125C17.0625 14.4162 15.9266 15.3978 14.5341 16.0244C13.0889 16.6748 11.1318 17.0625 9 17.0625C6.86823 17.0625 4.91111 16.6748 3.46587 16.0244C2.07342 15.3978 0.9375 14.4162 0.9375 13.125C0.9375 12.3758 1.32979 11.7262 1.90204 11.208C2.13232 10.9995 2.48804 11.0172 2.69656 11.2474Z"
                      fill=""
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_100_6003">
                      <rect width="18" height="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Địa chỉ: {address.address}, {getProvinceName(address.province)}
              </p>
            </div>
          ))}
          {newAddress || (
            <div className="w-full flex justify-center mt-5">
              <p onClick={handleNewAddress} className="text-primary hover:text-primary-dark cursor-pointer">Thêm địa chỉ mới</p>
            </div>
          )}
        </div>
        {(addresses.length === 0 || newAddress) && (
          <div className="flex flex-col">
            <div className="mb-5">
              <label htmlFor="firstName" className="block mb-2.5">
                Họ tên <span className="text-red">*</span>
              </label>

              <input
                type="text"
                name="name"
                id="name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="province" className="block mb-2.5">
                Tỉnh thành
                <span className="text-red">*</span>
              </label>

              <div className="relative">
                <select
                  className="w-full bg-gray-1 rounded-md border border-gray-3 text-dark-4 py-3 pl-5 pr-9 duration-200 appearance-none outline-none focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-primary/20"
                  name="province"
                  value={data.province}
                  onChange={(e) => setData({ ...data, province: e.target.value })}
                >
                  {provinceDatas.map((province) => (
                    <option key={province.id} value={province.id}>
                      {province.name}
                    </option>
                  ))}
                </select>

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-4">
                  <svg
                    className="fill-current"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.41469 5.03569L2.41467 5.03571L2.41749 5.03846L7.76749 10.2635L8.0015 10.492L8.23442 10.2623L13.5844 4.98735L13.5844 4.98735L13.5861 4.98569C13.6809 4.89086 13.8199 4.89087 13.9147 4.98569C14.0092 5.08024 14.0095 5.21864 13.9155 5.31345C13.9152 5.31373 13.915 5.31401 13.9147 5.31429L8.16676 10.9622L8.16676 10.9622L8.16469 10.9643C8.06838 11.0606 8.02352 11.0667 8.00039 11.0667C7.94147 11.0667 7.89042 11.0522 7.82064 10.9991L2.08526 5.36345C1.99127 5.26865 1.99154 5.13024 2.08609 5.03569C2.18092 4.94086 2.31986 4.94086 2.41469 5.03569Z"
                      fill=""
                      stroke=""
                      strokeWidth="0.666667"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="mb-5">
              <label htmlFor="address" className="block mb-2.5">
                Địa chỉ
                <span className="text-red">*</span>
              </label>

              <input
                type="text"
                name="address"
                id="address"
                placeholder="House number and street name"
                value={data.address}
                onChange={(e) => setData({ ...data, address: e.target.value })}
                className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="phone" className="block mb-2.5">
                Số điện thoại <span className="text-red">*</span>
              </label>

              <input
                type="text"
                name="phone"
                id="phone"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Billing;
