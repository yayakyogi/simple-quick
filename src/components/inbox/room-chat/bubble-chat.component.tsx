import React, { useRef } from "react";
import style from "./bubble-chat.module.less";
import classNames from "classnames";
import { Divider, Dropdown, IconButton, Popover, Whisper } from "rsuite";
import { time } from "@libraries/time";
import { IChats, IRoom } from "@resources/interface";

export interface BubbleProps {
  id: string;
  name: string;
  message: string;
  created_at: Date;
  is_me: boolean;
}

interface Props {
  chat: IChats;
  type: IRoom["type"];
  roomName: IRoom["name"];
  onUpdate: (action: "edit" | "delete", chatId: string) => void;
}

const BubbleChat: React.FC<Props> = ({ chat, type, roomName, onUpdate }) => {
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
              [style.bubbleDefault]:
                chat.sender.name !== "me" && type === "USER",
            }
          )}
        >
          <span>{chat.message}</span>
          <span className="text-xs">
            {time(chat.created_at).format("HH:mm")}
          </span>
        </div>
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
                  <Dropdown.Item>Share</Dropdown.Item>
                  <Dropdown.Item>Reply</Dropdown.Item>
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
      </div>
    </div>
  );
};

export default BubbleChat;
