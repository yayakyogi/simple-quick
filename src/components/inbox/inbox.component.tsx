import Loading from "@components/loading/loading.component";
import { useAtomic } from "@libraries/atom";
import { IChats, IRoom } from "@resources/interface";
import { messageListAtom, roomListAtom } from "@state/message.atom";
import React, { useEffect, useState } from "react";
import { Divider, Input, InputGroup } from "rsuite";
import InputGroupAddon from "rsuite/esm/InputGroup/InputGroupAddon";
import InboxItem from "./item/item.component";
import RoomChat from "./room-chat/room-chat.component";

type RoomList = IRoom & { message: IChats };

const InboxCard: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [room, setRoom] = useState<IRoom>({ id: "", name: "", type: "USER" });
  const [roomList, setRoomList] = useState<RoomList[]>([]);
  const [messageList] = useAtomic(messageListAtom);
  const [roomAtoms] = useAtomic(roomListAtom);

  const onCloseRoom = () => {
    // set default to close roome
    setRoom({ id: "", name: "", type: "USER" });
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    // get last message in every room
    const roomUpdate: RoomList[] = [];

    roomAtoms.forEach((room) => {
      const message = messageList.filter((msg) => msg.room_id === room.id);

      roomUpdate.push({ ...room, message: message[message.length - 1] });
    });

    setRoomList(roomUpdate);
  }, [messageList]);

  return (
    <div className="card-quick pb-0 animate__animated animate__bounceInRight">
      {room.id ? (
        <RoomChat room={room} onClose={onCloseRoom} />
      ) : (
        <>
          <div className="flex justify-between items-center sticky top-0 bg-white z-1 pt-6 pb-[22px]">
            <InputGroup>
              <Input placeholder="Search" />
              <InputGroupAddon>
                <div className="i-mdi:search" />
              </InputGroupAddon>
            </InputGroup>
          </div>
          {isLoading ? (
            <Loading text="Loading Chats ..." />
          ) : (
            roomList.map((room, index) => {
              return (
                <div key={room.id} onClick={() => setRoom(room)}>
                  <InboxItem
                    type={room.type}
                    name={room.name}
                    message={{
                      name: room.message.sender.name,
                      created_at: room.message.created_at,
                      message: room.message.message,
                      read: room.message.read,
                    }}
                  />
                  {roomList.length - 1 !== index && (
                    <Divider className="my-[22px]" />
                  )}
                </div>
              );
            })
          )}
        </>
      )}
    </div>
  );
};

export default InboxCard;
