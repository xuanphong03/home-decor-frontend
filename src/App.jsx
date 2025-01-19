import RenderLayout from "./core/RenderLayout";
import { ToastContainer } from "react-toastify";
import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { profileService } from "./services/profileService";
import { cartService } from "./services/cartService";
import "./App.scss";
import "react-quill/dist/quill.snow.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { permissionService } from "./services/permissionService";
import { AiOutlineMessage } from "react-icons/ai";
import ChatBox from "./components/ChatBox/ChatBox";

export const AppContext = createContext();

function App() {
  const { accessToken } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);
  const [scrolledDown, setScrolledDown] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [permissions, setPermissions] = useState(null);
  const [openChatBox, setOpenChatBox] = useState(false);

  const handleScroll = () => {
    setScrolledDown(window.scrollY > 0);
  };

  const getProfile = async () => {
    try {
      const response = await profileService.getProfile();
      setProfile(response.data);
    } catch (error) {
      throw new Error("Fetch profile to failed");
    }
  };

  const getPermissions = async () => {
    try {
      const response = await permissionService.getAll();
      setPermissions(response);
    } catch (error) {
      throw new Error("Get permissions to failed");
    }
  };

  const getCartItems = async () => {
    try {
      const response = await cartService.getCartItemsByUser();
      if (response.data.products) {
        setCartItems(response.data.products);
      }
    } catch (error) {
      throw new Error("Get cart by user to failed");
    }
  };

  useEffect(() => {
    const scrolledDown = window.scrollY > 0;
    setScrolledDown(scrolledDown);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (accessToken) {
      getProfile();
      getCartItems();
      getPermissions();
    }
  }, [accessToken]);

  return (
    <AppContext.Provider
      value={{
        profile,
        setProfile,
        scrolledDown,
        setScrolledDown,
        cartItems,
        setCartItems,
        permissions,
      }}
    >
      <RenderLayout />
      <div className="fixed bottom-10 right-10 text-white">
        <button
          onClick={() => setOpenChatBox(!openChatBox)}
          className={`relative flex h-10 w-10 delay-200 duration-300 ${
            !openChatBox ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex items-center justify-center text-xl rounded-full w-10 h-10 bg-sky-500">
            <AiOutlineMessage />
          </span>
        </button>
        <div
          className={`absolute bottom-0 right-0 transition-all duration-300 ${
            openChatBox
              ? "h-[400px] w-[600px] opacity-100 visible"
              : "h-0 w-0 opacity-0 invisible overflow-hidden"
          }`}
        >
          <ChatBox open={openChatBox} onClose={() => setOpenChatBox(false)} />
        </div>
      </div>
      <ToastContainer autoClose={2000} closeOnClick={true} />
    </AppContext.Provider>
  );
}

export default App;
