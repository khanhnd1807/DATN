import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";
import { Account } from "../../interfaces/Account";
import { useAppDispatch } from "../../redux/store";
import { login } from "../../redux/slices/Profile.slice";
import { ToastError } from "../common/toast/Toast";
import { email_filter } from "../../util/constants";
import styled from "@emotion/styled";

export const ScreenLogin: React.FC = () => {
  const dispatch = useAppDispatch();

  const [account, setAccount] = useState<Account>({
    email: "",
    password: "",
  });

  const validateMail = (mail: string) => {
    return email_filter.test(mail);
  };

  const [messageError, setMessageError] = useState({
    flip: false,
  });

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (account.email === "" || account.password === "") {
      setMessageError({
        flip: !messageError.flip,
      });
      ToastError("Không được để trống tài khoản hoặc mật khẩu.");
    } else {
      if (!validateMail(account.email)) {
        ToastError("You must use email of Zinza");
      } else {
        dispatch(login({ email: account.email, password: account.password }));
      }
    }
  };

  return (
    <div className="login">
      <div className="login_item1">
        <h2>Hệ thống quản lý nội bộ Zinza</h2>
        <p>Hệ thống vẫn đang hoàn thiện...</p>
        <p>Báo lỗi là việc của các bạn</p>
        <p>Còn fix bug là việc của chúng tôi</p>
      </div>

      <div className="login_item2">
        <form className="login_item2_panel-login" onSubmit={handleLogin}>
          <input
            className="input-login"
            type="text"
            value={account.email}
            onChange={(e) => setAccount({ ...account, email: e.target.value })}
          />

          <input
            type="password"
            className="input-login"
            value={account.password}
            onChange={(e) =>
              setAccount({ ...account, password: e.target.value })
            }
          />

          <button type="submit" className="login_item2_panel-login_button">
            Đăng nhập
            <GoogleIcon />
          </button>
        </form>
      </div>
    </div>
  );
};
