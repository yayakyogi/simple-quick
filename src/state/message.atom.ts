import { atom } from "jotai";
import { IChats, IRoom } from "@resources/interface";

export const messageListAtom = atom<IChats[]>([
  {
    id: "1",
    room_id: "1",
    message: "First message",
    created_at: "2024-08-25 20:45",
    read: true,
    sender: {
      id: "1",
      name: "me",
    },
  },
  {
    id: "2",
    room_id: "1",
    message: "Second message",
    created_at: "2024-08-28 11:30",
    read: true,
    sender: {
      id: "2",
      name: "John",
    },
  },
  {
    id: "3",
    room_id: "1",
    message: "Third message",
    created_at: "2024-08-28 11:42",
    read: false,
    sender: {
      id: "3",
      name: "Philips",
    },
  },
  {
    id: "4",
    room_id: "1",
    message: "Fourth message",
    created_at: "2024-08-28 11:43",
    read: false,
    sender: {
      id: "3",
      name: "Philips",
    },
  },
  {
    id: "5",
    room_id: "2",
    message: "Second message",
    created_at: "2024-08-26 11:30",
    read: true,
    sender: {
      id: "2",
      name: "John",
    },
  },
  {
    id: "6",
    room_id: "2",
    message: "First messagess",
    created_at: "2024-08-24 12:00",
    read: true,
    sender: {
      id: "1",
      name: "me",
    },
  },
  {
    id: "7",
    room_id: "3",
    message: "Hey there! Welcome to your inbox",
    created_at: "2024-08-23 15:10",
    read: true,
    sender: {
      id: "4",
      name: "Andy",
    },
  },
  {
    id: "8",
    room_id: "3",
    message: "Hey can i ask some question?",
    created_at: "2024-08-23 15:15",
    read: true,
    sender: {
      id: "1",
      name: "me",
    },
  },
]);

export const roomListAtom = atom<IRoom[]>([
  {
    id: "1",
    name: "109220-Naturalization",
    type: "GROUP",
  },
  {
    id: "2",
    name: "Jeanette Moraima Guaman Chamba (Hutto I-589) [Hutto Follow Up - Brief Service]",
    type: "GROUP",
  },
  {
    id: "3",
    name: "FastVisa Support",
    type: "USER",
  },
]);
