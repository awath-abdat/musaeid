import moment from "moment";
import * as commonmark from "commonmark";

type IMessage = {
  id: number;
  character: string;
  display_name: string;
  text: string;
  created_at: Date;
};

const Message = ({ character, display_name, text, created_at }: IMessage) => {
  const reader = new commonmark.Parser();
  const writer = new commonmark.HtmlRenderer();
  const parsedText = reader.parse(text);
  const formatedText = writer.render(parsedText);

  return (
    <div
      className={`flex items-center gap-2.5 ${character === "user" ? "justify-end" : ""}`}
    >
      <div
        className={`flex flex-col max-w-[480px] leading-1.5 p-4 border-gray-200 bg-gray-100 ${character !== "user" ? "rounded-e-xl rounded-es-xl" : "rounded-s-xl rounded-se-xl"}`}
      >
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900">
            {display_name}
          </span>
          <span className="text-sm font-normal text-gray-500">
            {moment(created_at).fromNow()}
          </span>
        </div>
        <div className="text-sm font-normal py-2.5 text-gray-900 whitespace-pre-line" dangerouslySetInnerHTML={{__html: formatedText}}>
        </div>
      </div>
    </div>
  );
};

export default Message;
