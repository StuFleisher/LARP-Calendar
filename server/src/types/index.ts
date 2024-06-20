import { TicketStatus } from "@prisma/client";

type PartialWithRequired<T,K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;

export type Tag = {
  name: string;
}

export type LarpForCreate = {
  title: string,
  ticketStatus: TicketStatus,
  tags: Tag[],
  start: Date,
  end: Date,
  allDay:boolean,
  imgUrl: string,
  city: string,
  country: string,
  language: string,
  description: string,
  organizer: string,
  eventUrl: string,
}

export type Larp = LarpForCreate & {
  id: number
}

export type LarpForUpdate = PartialWithRequired<Larp, 'id'>

export type UserForCreate = {
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  email: string,
  isOrganizer: boolean,
  isAdmin: boolean,
}

export type User = UserForCreate & {
  id: number
}

export type PublicUser = Omit<User,'password'>

export type UserForUpdate = PartialWithRequired<User, 'id' | 'username' >