import axios from "axios";
import { useEffect, useRef, useState } from "react";

import Message from "../components/Message";
import SendMessage from "../components/SendMessage";

type IMessage = {
  id: number;
  character: string;
  display_name: string;
  text: string;
  created_at: Date;
};

function Chat() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const scroll = useRef<HTMLSpanElement>(null);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/chat/${localStorage.getItem("chat_id") ? localStorage.getItem("chat_id") + "/" : ""}`,
      );
      setMessages(response.data.messages);
      localStorage.setItem("chat_id", response.data.chat_id);
    } catch (error) {}
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (scroll.current) scroll.current.scrollIntoView({ behavior: "auto" });
  })

  return (
    <div className="bg-white h-screen overflow-scroll">
      <div className="flex flex-col gap-2 px-28 pt-8 pb-[5rem]">
        {messages?.map((message) => <Message {...message} key={message.id} />)}
      </div>
      <SendMessage scroll={scroll} fetchMessages={fetchMessages} />
      <span ref={scroll}></span>
    </div>
  );
}

export default Chat;
