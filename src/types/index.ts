export interface UserLogin {
  username: string;
  password: string;
}

export interface UserRegister {
  username: string;
  password: string;
  name?: string;
}
export interface AuthResponse {
  session: Session;
  user: User;
}

export interface Session {
  token: string;
  refresh: string;
}

export interface User {
  _id: string;
  name: string;
  email?: string;
  mobileNumber?: string;
  username: string;
  avatarBackground: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
  // __v: number;
}

export interface GetUserResponse {
  totalCount: number;
  records: User[];
  totalPages: number;
  currentPage: number;
}

export interface UserQuery {
  page: number;
  query?: string;
}
export interface MessageQuery {
  user: string;
  skip: number;
}
export interface MessageGetResponse {
  count: number;
  messages: Message[];
}

export interface Message {
  _id: string;
  content: Content;
  sender: Sender;
  receiver: Receiver;
  status: string;
  statusHistory: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  participants: string[];
}

export interface Content {
  type: string;
  caption: string;
}

export interface Sender {
  _id: string;
  username: string;
  avatarBackground: string;
}

export interface Receiver {
  _id: string;
  username: string;
  avatarBackground: string;
}
export interface OutboundMessage {
  message: MessageText;
  user: string;
}

export interface MessageText {
  type: string;
  caption: string;
}
