import { AppContext } from "@/App";
import { useContext, useEffect, useRef } from "react";

export default function Messages({ messages = [] }) {
  const { profile } = useContext(AppContext);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({});
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <>
      {profile && messages.length > 0 && (
        <ul className="custom-scrollbar overflow-y-auto h-full pt-2 p-2 pb-12 w-full overflow-x-auto">
          {messages.map(({ id, content, senderId }) => (
            <li key={id} className={`group text-white text-sm my-2`}>
              <p
                className={` w-fit break-words rounded px-5 py-2 ${
                  profile.id === senderId
                    ? "bg-blue-600 ml-auto"
                    : "bg-gray-600 mr-auto"
                }`}
              >
                {content}
              </p>
            </li>
          ))}
          <li ref={messagesEndRef}></li>
        </ul>
      )}
      {profile && messages.length <= 0 && (
        <div className="p-5 text-center text-sm text-gray-500]">
          Hãy bắt đầu cuộc trò chuyện
        </div>
      )}
    </>
  );
}
