import axios from "axios";
import { RefObject, useState } from "react";

type IFetchMessages = () => Promise<void>;

type SendMessagePropsType = {
  scroll: RefObject<HTMLSpanElement>;
  fetchMessages: IFetchMessages;
};

const SendMessage = ({ scroll, fetchMessages }: SendMessagePropsType) => {
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  const sendMessage = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (message.trim() === "" || isLoading) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/chat/${localStorage.getItem("chat_id") ? localStorage.getItem("chat_id") + "/" : ""}`,
        {
          text: message,
        },
      );
      localStorage.setItem("chat_id", response.data.chat_id);
    } catch (error) {}
    setLoading(false);
    setMessage("");

    await fetchMessages();
  };

  return (
    <form
      onSubmit={(event) => sendMessage(event)}
      className="my-5 fixed bottom-0 px-28 w-full"
    >
      <label htmlFor="chat" className="sr-only">
        Your message
      </label>
      <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50">
        <button
          type="button"
          className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 18"
          >
            <path
              fill="currentColor"
              d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
            />
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
            />
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
            />
          </svg>
          <span className="sr-only">Upload image</span>
        </button>
        <button
          type="button"
          className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
            />
          </svg>
          <span className="sr-only">Add emoji</span>
        </button>
        <textarea
          id="chat"
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Your message..."
        ></textarea>
        <button
          type="submit"
          className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100"
        >
          {!isLoading && (
            <svg
              className="w-5 h-5 rotate-90 rtl:-rotate-90"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
            </svg>
          )}
          {isLoading && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
              width="20"
              height="20"
              style={{
                shapeRendering: "auto",
                display: "block",
                background: "transparent",
              }}
            >
              <g>
                <g transform="rotate(0 50 50)">
                  <rect
                    fill="#71ccfe"
                    height="12"
                    width="6"
                    ry="6"
                    rx="3"
                    y="24"
                    x="47"
                  >
                    <animate
                      repeatCount="indefinite"
                      begin="-0.9166666666666666s"
                      dur="1s"
                      keyTimes="0;1"
                      values="1;0"
                      attributeName="opacity"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(30 50 50)">
                  <rect
                    fill="#71ccfe"
                    height="12"
                    width="6"
                    ry="6"
                    rx="3"
                    y="24"
                    x="47"
                  >
                    <animate
                      repeatCount="indefinite"
                      begin="-0.8333333333333334s"
                      dur="1s"
                      keyTimes="0;1"
                      values="1;0"
                      attributeName="opacity"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(60 50 50)">
                  <rect
                    fill="#71ccfe"
                    height="12"
                    width="6"
                    ry="6"
                    rx="3"
                    y="24"
                    x="47"
                  >
                    <animate
                      repeatCount="indefinite"
                      begin="-0.75s"
                      dur="1s"
                      keyTimes="0;1"
                      values="1;0"
                      attributeName="opacity"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(90 50 50)">
                  <rect
                    fill="#71ccfe"
                    height="12"
                    width="6"
                    ry="6"
                    rx="3"
                    y="24"
                    x="47"
                  >
                    <animate
                      repeatCount="indefinite"
                      begin="-0.6666666666666666s"
                      dur="1s"
                      keyTimes="0;1"
                      values="1;0"
                      attributeName="opacity"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(120 50 50)">
                  <rect
                    fill="#71ccfe"
                    height="12"
                    width="6"
                    ry="6"
                    rx="3"
                    y="24"
                    x="47"
                  >
                    <animate
                      repeatCount="indefinite"
                      begin="-0.5833333333333334s"
                      dur="1s"
                      keyTimes="0;1"
                      values="1;0"
                      attributeName="opacity"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(150 50 50)">
                  <rect
                    fill="#71ccfe"
                    height="12"
                    width="6"
                    ry="6"
                    rx="3"
                    y="24"
                    x="47"
                  >
                    <animate
                      repeatCount="indefinite"
                      begin="-0.5s"
                      dur="1s"
                      keyTimes="0;1"
                      values="1;0"
                      attributeName="opacity"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(180 50 50)">
                  <rect
                    fill="#71ccfe"
                    height="12"
                    width="6"
                    ry="6"
                    rx="3"
                    y="24"
                    x="47"
                  >
                    <animate
                      repeatCount="indefinite"
                      begin="-0.4166666666666667s"
                      dur="1s"
                      keyTimes="0;1"
                      values="1;0"
                      attributeName="opacity"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(210 50 50)">
                  <rect
                    fill="#71ccfe"
                    height="12"
                    width="6"
                    ry="6"
                    rx="3"
                    y="24"
                    x="47"
                  >
                    <animate
                      repeatCount="indefinite"
                      begin="-0.3333333333333333s"
                      dur="1s"
                      keyTimes="0;1"
                      values="1;0"
                      attributeName="opacity"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(240 50 50)">
                  <rect
                    fill="#71ccfe"
                    height="12"
                    width="6"
                    ry="6"
                    rx="3"
                    y="24"
                    x="47"
                  >
                    <animate
                      repeatCount="indefinite"
                      begin="-0.25s"
                      dur="1s"
                      keyTimes="0;1"
                      values="1;0"
                      attributeName="opacity"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(270 50 50)">
                  <rect
                    fill="#71ccfe"
                    height="12"
                    width="6"
                    ry="6"
                    rx="3"
                    y="24"
                    x="47"
                  >
                    <animate
                      repeatCount="indefinite"
                      begin="-0.16666666666666666s"
                      dur="1s"
                      keyTimes="0;1"
                      values="1;0"
                      attributeName="opacity"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(300 50 50)">
                  <rect
                    fill="#71ccfe"
                    height="12"
                    width="6"
                    ry="6"
                    rx="3"
                    y="24"
                    x="47"
                  >
                    <animate
                      repeatCount="indefinite"
                      begin="-0.08333333333333333s"
                      dur="1s"
                      keyTimes="0;1"
                      values="1;0"
                      attributeName="opacity"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(330 50 50)">
                  <rect
                    fill="#71ccfe"
                    height="12"
                    width="6"
                    ry="6"
                    rx="3"
                    y="24"
                    x="47"
                  >
                    <animate
                      repeatCount="indefinite"
                      begin="0s"
                      dur="1s"
                      keyTimes="0;1"
                      values="1;0"
                      attributeName="opacity"
                    ></animate>
                  </rect>
                </g>
                <g></g>
              </g>
            </svg>
          )}
          <span className="sr-only">Send message</span>
        </button>
      </div>
    </form>
  );
};
export default SendMessage;
