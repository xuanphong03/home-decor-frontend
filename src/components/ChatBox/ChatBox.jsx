import { socket } from "@/socket";
import { Avatar } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import Messages from "./Messages";
import { AppContext } from "@/App";
import { chatService } from "@/services/chatService";
import { getFirstCharacterOfName } from "@/utils/clientUtils";

export default function ChatBox({ onClose }) {
  const { profile } = useContext(AppContext);
  const [messageList, setMessageList] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [receiverList, setReceiverList] = useState([]);
  const [receiverTarget, setReceiverTarget] = useState(null);
  const [message, setMessage] = useState("");
  const isAuthenticated = !!profile;

  const getReceivers = async () => {
    try {
      const response = await chatService.getReceivers();
      setReceiverList(response.data);
      if (response.data.length) {
        setReceiverTarget(response.data[0]);
      }
    } catch (error) {
      throw new Error("");
    }
  };

  const getMessages = async (id) => {
    try {
      const response = await chatService.getMessages({ id });
      setMessageList(response.data);
    } catch (error) {
      throw new Error("");
    }
  };

  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSelectReceiver = (id) => {
    const target = receiverList.find((user) => user.id === id);
    if (target && target?.id !== receiverTarget?.id) {
      setReceiverTarget(target);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message) return;
    if (!message.trim() || !receiverTarget || !profile) return;
    const conversationName = profile.isSupport
      ? receiverTarget.email
      : profile.email;
    const messageData = {
      conversationName,
      senderId: profile?.id,
      receiverId: receiverTarget?.id,
      content: message.trim(),
    };
    socket.emit("sendMessage", messageData); // Gửi tin nhắn qua socket
    setMessage("");
  };

  useEffect(() => {
    if (profile && receiverTarget) {
      const conversationName = profile.isSupport
        ? receiverTarget.email
        : profile.email;
      socket.emit("joinChat", { conversationName }); // Truyền email
    }

    function onConnect() {
      console.log("connect");
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onReceiveMessage(message) {
      console.log(message);
      // Nhận tin nhắn mới từ server và cập nhật danh sách tin nhắn
      if (
        message.senderId === receiverTarget?.id || // Tin nhắn từ người đang trò chuyện
        message.senderId === profile?.id // Tin nhắn gửi đến bạn
      ) {
        setMessageList((prev) => [...prev, message]);
      }
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("receiveMessage", onReceiveMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("receiveMessage", onReceiveMessage);
    };
  }, [profile, receiverTarget]);

  useEffect(() => {
    if (receiverTarget) {
      getMessages(receiverTarget.id);
    }
  }, [receiverTarget]);

  useEffect(() => {
    // Lắng nghe tin nhắn từ server
    socket.on("messages", (newMessage) => {
      setMessageList((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("messages");
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getReceivers();
    }
  }, [isAuthenticated]);

  useEffect(() => {}, []);
  return (
    <div className="bg-white text-secondary w-full h-full shadow border border-solid border-gray-300">
      <div className="relative flex flex-col h-full">
        <div className="absolute top-0 left-0 right-0 p-2 bg-gray-100 z-10">
          <h2 className="font-medium">Tin nhắn</h2>
          <button
            onClick={() => onClose()}
            className="absolute top-0 bottom-0 right-0 flex items-center justify-center w-10 hover:bg-gray-300 transition-all"
          >
            <IoMdClose className="text-xl" />
          </button>
        </div>
        <div className="pt-10 flex h-full border-t border-solid border-gray-300">
          <ul className="custom-scrollbar w-[200px] flex-shrink-0 border-r border-solid border-gray-300 overflow-y-auto h-full">
            {receiverList.map(({ id, name, imageUrl }) => (
              <li
                onClick={() => handleSelectReceiver(id)}
                key={id}
                className={`p-2 flex items-center gap-2 cursor-pointer transition-colors ${
                  receiverTarget?.id === id
                    ? "bg-gray-600 text-white"
                    : "hover:bg-gray-100 "
                }`}
              >
                <Avatar src={imageUrl} alt={name}>
                  {getFirstCharacterOfName(name)}
                </Avatar>
                <p className="text-sm line-clamp-1">{name}</p>
              </li>
            ))}
          </ul>
          <div className="relative w-full h-full">
            {!isAuthenticated && (
              <div className="flex-1 flex items-center justify-center text-sm py-4 text-center">
                Vui lòng{" "}
                <Link to={"/login"} className="mx-1 underline text-primary">
                  đăng nhập
                </Link>{" "}
                để sử dụng dịch vụ
              </div>
            )}
            {isAuthenticated && <Messages messages={messageList} />}
            <form
              onSubmit={handleSendMessage}
              className="bg-white absolute bottom-0 left-0 right-0 pl-4 pr-16 py-2 border-t border-solid border-gray-300"
            >
              <input
                value={message}
                onChange={handleChangeMessage}
                placeholder="Nhập tin nhắn..."
                className="text-sm w-full outline-none"
              />
              <button
                type="submit"
                className="absolute top-0 right-0 bottom-0 flex w-10 items-center justify-center bg-blue-500 hover:bg-opacity-80 transition-colors"
              >
                <FiSend className="text-white text-xl" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
