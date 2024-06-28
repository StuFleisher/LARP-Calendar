
export type Tag = {
  id: number;
  name: string;
};

export enum ticketStatus {
  AVAILABLE = "Available",
  LIMITED = "Limited",
  SOLD_OUT = "Sold-Out"
}

export type Larp = {
  id: number;
  title: string,
  ticketStatus: ticketStatus,
  tags: Tag[],
  start: Date,
  end: Date,
  allDay: boolean,
  imgUrl: string,
  city: string,
  country: string,
  language: string,
  description: string,
  organizer: string,
  eventUrl: string,
};

export type UserForCreate = {
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  email: string,
  isOrganizer: boolean,
  isAdmin: boolean,
};

export type User = UserForCreate & {
  id: number;
};

export type UserLoginData = {
  username: string,
  password: string,
};