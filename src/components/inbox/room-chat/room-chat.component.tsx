import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Divider, IconButton, Input } from "rsuite";
import BubbleChat from "./bubble-chat.component";
import { time } from "@libraries/time";
import { IChats, IRoom } from "@resources/interface";
import { groupBy } from "lodash-es";
import classNames from "classnames";
import ConnectingAlert from "../connecting-alert/connecting-alert.component";
import { useAtom } from "jotai";
import { messageListAtom } from "@state/message.atom";

interface Props {
  room: IRoom;
  onClose: () => void;
}

const RoomChat: React.FC<Props> = ({ room, onClose }) => {
  const [messageAtom, setMessageAtom] = useAtom(messageListAtom);
  const ref = useRef<any>(null);

  const [message, setMessage] = useState<string>("");
  const [isShowAlert, setIsShowAlert] = useState<boolean>(true);
  const [chatId, setChatId] = useState<string>("");
  const [replyMsg, setReplyMsg] = useState<string>("");

  const messageList = useMemo(() => {
    const results: { created_at: string; messages: IChats[] }[] = [];
    const messagesFilter = messageAtom.filter((msg) => msg.room_id === room.id);

    const groupByDate = groupBy(messagesFilter, (msg) => {
      if (!msg.read) {
        return "New Message";
      }

      if (time(msg.created_at).date() === time().date()) {
        return "Hari ini";
      }

      if (time(msg.created_at).date() === time().date() - 1) {
        return "Kemarin";
      }

      return time(msg.created_at).format("DD MMMM, YYYY");
    });

    Object.entries(groupByDate).forEach(([day, rows]) => {
      const result: { created_at: string; messages: IChats[] } = {
        created_at: day,
        messages: [],
      };

      for (let i = 0; i < rows.length; i++) {
        result.messages.push({
          id: rows[i].id,
          message: rows[i].message,
          read: rows[i].read,
          room_id: rows[i].room_id,
          sender: rows[i].sender,
          created_at: rows[i].created_at,
          reply: rows[i].reply,
        });
      }

      results.push(result);
    });

    return results;
  }, [messageAtom]);

  const onSendMessage = () => {
    const randomId = Math.random().toString(36).slice(2);

    const newData: IChats = {
      id: randomId,
      created_at: time().toString(),
      read: true,
      room_id: room.id,
      sender: {
        id: "1",
        name: "me",
      },
      reply: replyMsg,
      message,
    };

    setReplyMsg("");
    setMessageAtom([...messageAtom, newData]);
  };

  const onUpdateMessage = () => {
    const updateData = messageAtom.map((msg) => {
      if (msg.id === chatId) {
        msg.message = message;
      }

      return msg;
    });

    setChatId("");
    setMessageAtom(updateData);
  };

  const onDeleteMessage = (chatId: string) => {
    const updateData = messageAtom.filter((msg) => msg.id !== chatId);

    setMessageAtom(updateData);
  };

  const onRoomClose = () => {
    const readedMessage = messageAtom.map((msg) => {
      if (msg.room_id === room.id) {
        msg.read = true;
      }

      return msg;
    });

    onClose();
    setMessageAtom(readedMessage);
  };

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [messageAtom]);

  useEffect(() => {
    setTimeout(() => {
      setIsShowAlert(false);
    }, 2000);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center sticky top-0 bg-white z-1 pt-5 pb-[20px] px-3 border-b border-b-solid border-black -mx-8">
        <IconButton
          className="btn-icon-custom"
          icon={<div className="i-mdi:arrow-back text-xl" />}
          onClick={onRoomClose}
        />
        <div className="flex flex-1 flex-col ml-2">
          <span className="text-blue font-600">{room.name}</span>
          {room.type === "GROUP" && <span>3 participans</span>}
        </div>
        <IconButton
          className="btn-icon-custom"
          icon={<div className="i-mdi:close text-xl" />}
          onClick={onRoomClose}
        />
      </div>
      <div className="flex-1 mt-2">
        {messageList.map((msg) => {
          return (
            <div key={msg.created_at}>
              <Divider className="my-1">
                <span
                  className={classNames({
                    ["text-red font-600"]: msg.created_at === "New Message",
                  })}
                >
                  {msg.created_at}
                </span>
              </Divider>
              {msg.messages.map((chat: IChats) => {
                return (
                  <BubbleChat
                    type={room.type}
                    chat={chat}
                    roomName={room.name}
                    onUpdate={(action, chatId) => {
                      if (action === "delete") {
                        onDeleteMessage(chatId);
                      } else {
                        const fltrMsg = msg.messages.find(
                          (msg) => msg.id === chatId
                        );

                        setChatId(chatId);
                        setMessage(fltrMsg?.message || "");
                      }
                    }}
                    onReply={(chatMsg) => setReplyMsg(chatMsg)}
                  />
                );
              })}
            </div>
          );
        })}
        <div ref={ref} />
      </div>
      {isShowAlert && room.type === "USER" && <ConnectingAlert />}

      <div className=" flex items-end -mx-7 gap-1 p-3 bg-white sticky bottom-0">
        <div
          className={classNames("w-full relative rounded overflow-hidden", {
            "border-1px border-solid border-black": replyMsg,
          })}
        >
          {replyMsg && (
            <div className="p-3 bg-gray w-a border-b-1px border-b-solid border-black relative">
              <span>{replyMsg}</span>
              <IconButton
                className="bg-transparent hover:bg-transparent focus:bg-transparent absolute top-0 right-0"
                icon={<div className="i-mdi:close" />}
                onClick={() => setReplyMsg("")}
              />
            </div>
          )}
          <Input
            className={classNames({ "rounded-none": replyMsg !== "" })}
            value={message}
            placeholder="Type a new message"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (chatId) {
                  onUpdateMessage();
                } else {
                  onSendMessage();
                }

                setMessage("");
              }
            }}
            onChange={(val) => setMessage(val)}
          />
        </div>
        <Button
          appearance="primary"
          disabled={!message}
          onClick={() => {
            if (chatId) {
              onUpdateMessage();
            } else {
              onSendMessage();
            }

            setMessage("");
          }}
        >
          Save
        </Button>
        {chatId && (
          <Button
            onClick={() => {
              setChatId("");
              setMessage("");
            }}
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default RoomChat;
