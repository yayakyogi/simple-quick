import { time } from "@libraries/time";
import { IChats, Room } from "@resources/message";
import React from "react";
import { Avatar, AvatarGroup } from "rsuite";

interface InboxProps {
  type: Room["type"];
  name: Room["name"];
  message: {
    name: IChats["sender"]["name"];
    created_at: IChats["created_at"];
    read: IChats["read"];
    message: IChats["message"];
  };
}

const InboxItem: React.FC<InboxProps> = ({ type, name, message }) => {
  return (
    <div className="flex items-start gap-4 relative">
      <div className="w-16 flex justify-center">
        {type === "GROUP" ? (
          <AvatarGroup>
            <Avatar circle className="-mr-5">
              <div className="i-mdi:user-outline text-2xl text-black" />
            </Avatar>
            <Avatar circle className="bg-blue">
              <div className="i-mdi:user-outline text-2xl" />
            </Avatar>
          </AvatarGroup>
        ) : (
          <Avatar circle>
            <div className="i-mdi:user-outline text-2xl text-black" />
          </Avatar>
        )}
      </div>
      <div>
        <div className="flex items-start gap-3">
          <span className=" text-blue font-600 max-w-3/4">{name}</span>
          <span>{time(message.created_at).format("DD/MM/YYYY HH:mm")}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-black font-600">{message.name}</span>
          <span>{message.message}</span>
        </div>
      </div>
      {!message.read && (
        <div className="absolute right-0 top-5 h-[10px] w-[10px] rounded-full bg-red" />
      )}
    </div>
  );
};

export default InboxItem;
