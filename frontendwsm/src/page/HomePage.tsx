import Sidebar from "../components/common/sidebar/Sidebar";
import Header from "../components/common/NavBar";
import { Outlet } from "react-router-dom";
import "../style/style.scss";
import { Footer } from "../components/common/Footer";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector(
    (state: RootState) => state.userReducers.profile.user
  );

  return user.user_id === BigInt(0) ? (
    <></>
  ) : (
    <div className="home-page">
      <div className="item1">
        <Sidebar />
      </div>

      <div className="item2">
        <div>
          <Header />
          <Outlet />
        </div>
        <div className="item2_row2">
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
