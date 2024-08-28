interface User {
  id: string;
  name: string;
}

export interface IRoom {
  id: string;
  name: string;
  type: "USER" | "GROUP";
}

export interface IChats {
  id: string;
  room_id: string;
  message: string;
  created_at: string;
  read: boolean;
  sender: User;
  reply?: string;
}
