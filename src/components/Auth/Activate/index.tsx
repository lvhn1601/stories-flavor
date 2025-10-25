import Breadcrumb from "@/components/Common/Breadcrumb";
import { useAPI } from "@/hooks/useAPI";
import { useLoading } from "@/hooks/useLoading";
import { User } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

const Activate = ({ user }: { user: User }) => {
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    password: "",
    reTypePassword: "",
  });

  const router = useRouter();

  const { API } = useAPI();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    checkProfile()
    const err = new URLSearchParams(window.location.search).get('error')
    setError(err || null)
  }, [user]);

  const checkProfile = async () => {
    showLoading()
    if (!user || user?.isActivated)
      router.push('/');
    hideLoading()
  };

  useEffect(() => {
    if (!formData.name && !formData.phone && !formData.password && !formData.reTypePassword) {
      setError(null);
      return;
    }

    if (!formData.name || !formData.phone || !formData.password) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const phone = formData.phone.trim().replace(/[\s-]/g, "");
    const phoneRegex = /^(?:\+84|0)(?:3|5|7|8|9)\d{8}$/;
    if (!phoneRegex.test(phone)) {
      setError("Số điện thoại không hợp lệ");
      return;
    }

    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (formData.password !== formData.reTypePassword) {
      setError("Mật khẩu xác thực không khớp");
      return;
    };

    setError(null);
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await API.post("/auth/activate", {
      name: formData.name,
      phone: formData.phone,
      password: formData.password,
    }, true, true);

    if (res.success) router.push("/");
  }

  return (
    <>
      {/* <Breadcrumb title={"Signup"} pages={["Signup"]} /> */}
      <section className="overflow-hidden py-20">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                Xác thực tài khoản
              </h2>
            </div>

            <div className="mt-5.5">
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label htmlFor="name" className="block mb-2.5">
                    Tên của bạn <span className="text-red">*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Nhập tên của bạn"
                    className="rounded-lg border border-gray-4 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-primary/20"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
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
                    placeholder="Nhập địa chỉ email"
                    className="rounded-lg border border-gray-4 bg-gray-1 text-gray-5 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200"
                    value={formData.email}
                    readOnly
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="password" className="block mb-2.5">
                    Số điện thoại <span className="text-red">*</span>
                  </label>

                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Nhập số điện thoại"
                    autoComplete="on"
                    className="rounded-lg border border-gray-4 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-primary/20"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="password" className="block mb-2.5">
                    Mật khẩu <span className="text-red">*</span>
                  </label>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Nhập mật khẩu"
                    autoComplete="on"
                    className="rounded-lg border border-gray-4 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-primary/20"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>

                <div className="mb-5.5">
                  <label htmlFor="re-type-password" className="block mb-2.5">
                    Xác thực mật khẩu <span className="text-red">*</span>
                  </label>

                  <input
                    type="password"
                    name="re-type-password"
                    id="re-type-password"
                    placeholder="Nhập lại mật khẩu"
                    autoComplete="on"
                    className="rounded-lg border border-gray-4 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-primary/20"
                    value={formData.reTypePassword}
                    onChange={e => setFormData({ ...formData, reTypePassword: e.target.value })}
                  />
                </div>

                <p className="text-red-light text-center w-full">
                  {error}
                </p>

                <button
                  type="submit"
                  className="w-full flex justify-center font-medium text-white bg-primary py-3 px-6 rounded-lg ease-out duration-200 hover:bg-primary-hover mt-7.5"
                  disabled={!!error || !formData.name || !formData.phone || !formData.password || !formData.reTypePassword}
                >
                  Xác thực
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Activate;
