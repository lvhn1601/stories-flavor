import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const UserDropdown = ({ user }) => {
    const [dropdownToggler, setDropdownToggler] = useState(false);

    const menuItem = [
        { title: "Tài khoản của tôi", path: "/profile" },
        { title: "Đơn mua", path: "/orders" },
        { title: "Đăng xuất", path: "#", action: () => {
            signOut({ callbackUrl: "/" });
        } },
    ]

    return (
        <div
            onClick={() => setDropdownToggler(!dropdownToggler)}
            className={`group relative cursor-pointer before:w-0 before:h-[3px]`}
        >
            <div className={ `flex items-center gap-3.5 text-custom-sm font-medium text-white`}>
                <Image
                    src={user.image ?? "/images/users/user-01.jpg"}
                    alt={user.name ?? "User avatar"}
                    width={32}
                    height={32}
                    className="rounded-full"
                />
                {user.name}
            </div>

            {/* <!-- Dropdown Start --> */}
            <ul
                className={`dropdown ${dropdownToggler && "flex"} bg-primary-dark border-none shadow-1 xl:group-hover:translate-y-0 mt-4 z-9999`}
            >
                {menuItem.map((item, i) => (
                    <li key={i}>
                        <Link
                            href={item.path}
                            className={`flex text-white text-custom-sm hover:bg-primary py-[7px] px-4.5`}
                            onClick={item.action}
                        >
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserDropdown;
