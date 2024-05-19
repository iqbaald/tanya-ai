import { IoSettingsOutline, IoMenu } from "react-icons/io5";
import { CiChat1 } from "react-icons/ci";
import { FiHelpCircle } from "react-icons/fi";
import { GoPlus, GoHistory } from "react-icons/go";
import { useContext, useState } from "react";
import { Context } from "../context/Context";

export default function Sidebar() {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompt, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  const handleExtended = () => {
    setExtended(!extended);
  };

  return (
    <div
      className={`sidebar max-lg:hidden py-6 px-4 transition duration-300 ease-in-out min-h-screen flex flex-col justify-between bg-gray-100 
      
      `}
    >
      <div className="top">
        <IoMenu
          onClick={handleExtended}
          className="block ml-[10px] text-xl cursor-pointer"
        />
        <div
          onClick={() => newChat()}
          className="new-chat py-2 px-3 mt-10 gap-2 inline-flex items-center  bg-neutral-200 text-neutral-500 text-lg rounded-full cursor-pointer hover:bg-neutral-200"
        >
          <GoPlus className="w-4 text-2xl" />
          {extended ? <p className="text-base">New Chat</p> : null}
        </div>

        {extended ? (
          <div className="recent flex flex-col">
            <p className="recent-title mt-7 mb-5  ">Recent </p>
            {prevPrompt.map((item, index) => {
              const displayItem =
                item.length < 17 ? item : `${item.slice(0, 16)}...`;
              return (
                <div
                  onClick={() => loadPrompt(item)}
                  key={index}
                  className="recent-entry p-2 gap-2 flex items-center text-neutral-900 rounded-full cursor-pointer hover:bg-neutral-200"
                >
                  <CiChat1 className="w-5" />
                  <p>{displayItem}</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="bottom flex flex-col">
        <div className="bottom-item recent-entry p-2 gap-2 flex items-center text-neutral-900 rounded-full cursor-pointer hover:bg-neutral-200">
          <FiHelpCircle className="w-5 text-lg" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry p-2 gap-2 flex items-center text-neutral-900 rounded-full cursor-pointer hover:bg-neutral-200">
          <GoHistory className="w-5" />
          {extended ? <p>History</p> : null}
        </div>
        <div className="bottom-item recent-entry p-2 gap-2 flex items-center text-neutral-900 rounded-full cursor-pointer hover:bg-neutral-200">
          <IoSettingsOutline className="w-5" />
          {extended ? <p>Setting</p> : null}
        </div>
      </div>
    </div>
  );
}
