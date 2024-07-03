
import { DateTime } from "luxon";

type PartialWithRequired<T,K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;

export type Tag = {
  id: number;
  name: string;
};

export type TicketStatus =  "AVAILABLE" |  "LIMITED" |  "SOLD_OUT";

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

export type LarpAsJSON = LarpForCreate & {
  id?:number,
  start: string,
  end: string,
}

// export type LarpWithJSDates = Omit<Larp, 'start' | 'end'> & {
//   start: Date;
//   end: Date;
// };

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

export type PublicUser = Omit<User,'password'>

export type UserForUpdate = PartialWithRequired<User, 'id' | 'username' >