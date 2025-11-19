import { FormEvent, useEffect, useState } from "react";

const ChangePassword = ({ onSubmit } : { onSubmit: (data) => Promise<boolean> }) => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    checkForm();
  }, [passwordData])

  const checkForm = () => {
    if ((passwordData.oldPassword && passwordData.oldPassword.length < 6) || (passwordData.newPassword && passwordData.newPassword.length < 6)) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }

    if (passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword) {
      setError("Mật khẩu xác thực không khớp");
      return false;
    };

    setError(null);
    if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword)
      return false;

    return true;
  };

  const clearData = () => {
    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!checkForm())
      return;

    if (onSubmit) {
      const success = await onSubmit(passwordData);

      if (success)
        clearData();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-4 sm:p-8.5">
      <p className="font-medium text-xl sm:text-2xl text-dark mb-7">
        Đổi mật khẩu
      </p>

      <div className="mb-5">
        <label htmlFor="oldPassword" className="block mb-2.5">
          Mật khẩu cũ
        </label>

        <input
          type="password"
          name="oldPassword"
          id="oldPassword"
          value={passwordData.oldPassword}
          onChange={handleChange}
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
          value={passwordData.newPassword}
          onChange={handleChange}
          autoComplete="on"
          className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="confirmPassword"
          className="block mb-2.5"
        >
          Xác nhận mật khẩu mới
        </label>

        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={passwordData.confirmPassword}
          onChange={handleChange}
          autoComplete="on"
          className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {error && (
        <p className="mb-5 text-red">{error}</p>
      )}

      <button
        type="submit"
        // disabled={(!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) || !!error}
        className="inline-flex font-medium text-white bg-primary py-3 px-7 rounded-md ease-out duration-200 hover:bg-primary-dark"
      >
        Đổi mật khẩu
      </button>
    </form>
  )
}

export default ChangePassword