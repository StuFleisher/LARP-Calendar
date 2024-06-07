
export type Tag = {
  id: number;
  name: string;
}

export type Larp = {
  id: number
  title: string,
  ticketStatus: "Available" | "Limited" | "Sold Out",
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

