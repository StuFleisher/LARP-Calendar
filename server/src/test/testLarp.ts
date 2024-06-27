import { Larp, Tag } from "../types";

const START = new Date();
const END = new Date(START.getTime() + 1 * 24 * 60 * 60 * 1000);

const testTag:Tag = {
  name:"testTag"
}

const testLarp:Larp = {
  id:1,
  title: "testLarp-title",
  ticketStatus: "AVAILABLE",
  tags: [testTag],
  start: START,
  end: END,
  allDay:false,
  imgUrl: "https://testLarp.com",
  city: "testLarp-city",
  country: "testLarp-country",
  language: "testLarp-language",
  description: "testLarp-description",
  organizer: "testLarp-organizer",
  eventUrl: "https://testLarp.com",
}

export {testTag, testLarp}