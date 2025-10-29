"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";

const SigninPageContent = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (session && session.user) {
      router.push("/");
    }
  }, [session]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      callbackUrl: "/",
    });
  };

  const handleGoogleSignin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <section className="flex flex-col items-center justify-center overflow-hidden min-h-[100vh] bg-gray-2">
      <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-7">
        <div className="text-center mb-11">
          <h2 className="font-semibold text-2xl text-dark mb-1.5">
            Đăng nhập
          </h2>
        </div>

        <form onSubmit={handleSignin}>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2.5">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Nhập email của bạn"
              className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="block mb-2.5">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              placeholder="Nhập mật khẩu"
              className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-primary py-3 px-6 rounded-lg hover:bg-primary-hover"
          >
            Đăng nhập
          </button>

          <span className="relative block text-center mt-6">
            <span className="absolute left-0 top-1/2 h-px w-full bg-gray-3"></span>
            <span className="relative bg-white px-3">Hoặc</span>
          </span>

          <button
            type="button"
            onClick={handleGoogleSignin}
            className="flex justify-center items-center gap-3 mt-5 rounded-lg border border-gray-3 bg-gray-1 py-3 hover:bg-gray-2 w-full"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_98_7461)">
                <mask
                  id="mask0_98_7461"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                >
                  <path d="M20 0H0V20H20V0Z" fill="white" />
                </mask>
                <g mask="url(#mask0_98_7461)">
                  <path
                    d="M19.999 10.2218C20.0111 9.53429 19.9387 8.84791 19.7834 8.17737H10.2031V11.8884H15.8267C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.999 13.2661 19.999 10.2218Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M10.2036 20C12.9586 20 15.2715 19.1111 16.9609 17.5777L13.7409 15.1332C12.8793 15.7223 11.7229 16.1333 10.2036 16.1333C8.91317 16.126 7.65795 15.7206 6.61596 14.9746C5.57397 14.2287 4.79811 13.1802 4.39848 11.9777L4.2789 11.9877L1.12906 14.3766L1.08789 14.4888C1.93622 16.1457 3.23812 17.5386 4.84801 18.512C6.45791 19.4852 8.31194 20.0005 10.2036 20Z"
                    fill="#34A853"
                  />
                  <path
                    d="M4.39899 11.9776C4.1758 11.3411 4.06063 10.673 4.05807 9.9999C4.06218 9.3279 4.1731 8.66067 4.38684 8.02221L4.38115 7.88959L1.1927 5.46234L1.0884 5.51095C0.372762 6.90337 0 8.44075 0 9.99983C0 11.5589 0.372762 13.0962 1.0884 14.4887L4.39899 11.9776Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M10.2039 3.86663C11.6661 3.84438 13.0802 4.37803 14.1495 5.35558L17.0294 2.59997C15.1823 0.90185 12.7364 -0.0298855 10.2039 -3.67839e-05C8.31239 -0.000477835 6.45795 0.514733 4.84805 1.48799C3.23816 2.46123 1.93624 3.85417 1.08789 5.51101L4.38751 8.02225C4.79107 6.82005 5.5695 5.77231 6.61303 5.02675C7.65655 4.28119 8.91254 3.87541 10.2039 3.86663Z"
                    fill="#EB4335"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_98_7461">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Đăng nhập bằng Google
          </button>

          <p className="text-center mt-6">
            Bạn chưa có tài khoản?
            <Link href="/signup" className="text-primary pl-2">
              Đăng ký ngay!
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

const SigninPage = () => {
  <Suspense fallback={<div>Loading...</div>}>
    <SigninPageContent />
  </Suspense>
}

export default SigninPage;
