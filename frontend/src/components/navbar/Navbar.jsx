import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { logout, reset } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaSignInAlt, FaSignOutAlt, FaUser, FaUpload } from "react-icons/fa";


import { useContext } from "react";


const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const dispatch1 = useDispatch();
  const { user } = useSelector((state) => state.auth);


  const onLogout = () => {
    dispatch1(logout());
    dispatch1(reset());
    navigate("/login");
  };

  const onUploadClick = () => {
    navigate("/upload");
  }


  return (
    <div className="navbar">
      <div className="wrapper">
        
      {user ? (
        <><div className="search">
        <input type="text" placeholder="Search..." />
        <SearchOutlinedIcon />
      </div>
      <div className="items">
        <div className="item">
          <LanguageOutlinedIcon className="icon" />
          English
        </div>
        <div className="item">
          <DarkModeOutlinedIcon
            className="icon"
            onClick={() => dispatch({ type: "TOGGLE" })}
          />
        </div>
        <div className="item">
          <FullscreenExitOutlinedIcon className="icon" />
        </div>
        <div className="item">
          <NotificationsNoneOutlinedIcon className="icon" />
          <div className="counter">1</div>
        </div>
        <div className="item">
          <ChatBubbleOutlineOutlinedIcon className="icon" />
          <div className="counter">2</div>
        </div>
        <div className="item">
          <ListOutlinedIcon className="icon" />
        </div>
        <div className="item">
          <FaUpload className="icon" onClick={onUploadClick}/>
        </div>
        <div className="item">
          <img
            src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="avatar" onClick={onLogout}
          />
        </div>
      </div></> )
      : (<> 
            <ul className="items login">

            <li className="item">
             <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li className="item">
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
            </ul>
      </>)
      }
        
      </div>
    </div>
  );
};

export default Navbar;
