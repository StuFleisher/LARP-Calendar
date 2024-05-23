import { DateTime } from "luxon"

export type Tag = {
  id: number;
  name: string;
}

export type Larp = {
  title: string,
  ticketStatus: "Available" | "Limited" | "Sold Out",
  tags: Tag[],
  startDate: DateTime,
  endDate: DateTime,
  imgUrl: string,
  city: string,
  country: string,
  language: string,
  description: string,
  organizer: string,
  eventUrl: string,
}

