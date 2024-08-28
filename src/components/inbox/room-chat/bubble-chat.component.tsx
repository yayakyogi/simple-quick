import React, { useRef } from "react";
import style from "./bubble-chat.module.less";
import classNames from "classnames";
import { Divider, Dropdown, IconButton, Popover, Whisper } from "rsuite";
import { time } from "@libraries/time";
import { IChats, IRoom } from "@resources/interface";

interface Props {
  chat: IChats;
  type: IRoom["type"];
  roomName: IRoom["name"];
  onUpdate: (action: "edit" | "delete", chatId: string) => void;
  onReply: (message: string) => void;
}

const BubbleChat: React.FC<Props> = ({
  chat,
  type,
  roomName,
  onUpdate,
  onReply,
}) => {
  const triggerRef = useRef<any>();

  return (
    <div className="flex flex-col mb-2">
      <span
        className={classNames("font-bold mb-1", {
          ["ml-a"]: chat.sender.name === "me",
          [style.titlePurple]: chat.sender.name === "me",
          [style.titleOrange]: chat.sender.name !== "me" && type === "GROUP",
          [style.titleDefault]: chat.sender.name !== "me" && type === "USER",
        })}
      >
        {chat.sender.name === "me"
          ? "You"
          : type === "GROUP"
            ? chat.sender.name
            : roomName}
      </span>
      {chat.reply && (
        <div className="ml-a min-w-40 bg-gray p-2 rounded border-1 border-solid border-slate-3 mb-1">
          {chat.reply}
        </div>
      )}
      <div
        className={classNames("w-full flex items-center gap-1", {
          [style.reverse]: chat.sender.name === "me",
        })}
      >
        <div
          className={classNames(
            "min-w-20 max-w-3/4 flex flex-col gap-2 p-2 rounded",
            {
              [style.bubbleOrange]: chat.sender.name !== "me",
              [style.bubblePurple]: chat.sender.name === "me",
              [style.bubbleDefault]: chat.sender.name !== "me" && type === "USER",
            }
          )}
        >
          <span>{chat.message}</span>
          <span className="text-xs">{time(chat.created_at).format("HH:mm")}</span>
        </div>
        {(type === "GROUP" ||
          (type === "USER" && chat.sender.name === "me")) && (
          <Whisper
            ref={triggerRef}
            trigger="click"
            placement="bottomEnd"
            speaker={
              <Popover className="p-0">
                {chat.sender.name === "me" ? (
                  <Dropdown.Menu className="w-20">
                    <Dropdown.Item
                      onClick={() => {
                        onUpdate("edit", chat.id);
                        triggerRef.current.close();
                      }}
                    >
                      <span className="text-blue">Edit</span>
                    </Dropdown.Item>
                    <Divider className="my-0" />
                    <Dropdown.Item
                      onClick={() => {
                        onUpdate("delete", chat.id);
                        triggerRef.current.close();
                      }}
                    >
                      <span className="text-danger">Delete</span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                ) : (
                  <Dropdown.Menu className="w-20">
                    <Dropdown.Item disabled>Share</Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        onReply(chat.message);
                        triggerRef.current.close();
                      }}
                    >
                      Reply
                    </Dropdown.Item>
                  </Dropdown.Menu>
                )}
              </Popover>
            }
          >
            <IconButton
              className="btn-icon-custom"
              icon={<div className="i-mdi:dots-horizontal text-lg" />}
            />
          </Whisper>
        )}
      </div>
    </div>
  );
};

export default BubbleChat;
