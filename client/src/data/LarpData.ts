import { DateTime } from "luxon";
import { Tag, Larp } from "../types";

const START = DateTime.utc()
const END = START.plus({days:3})

const Tag1:Tag={
  id:1,
  name:"Tag1"
}
const Tag2:Tag={
  id:2,
  name:"Tag2"
}

const TestLarp1:Larp = {
  title: 'Larp1 names can be long strings that take multiple lines',
  ticketStatus: "Limited",
  tags: [Tag1, Tag2],
  startDate: START,
  endDate: END ,
  imgUrl: "https://picsum.photos/900/800",
  city: "Stratfordshire",
  country: "United Kingdom",
  language: "English",
  description: "This is a description of Larp1",
  organizer:'Test Organizer',
  eventUrl:'https://test.com',
}


export {TestLarp1}