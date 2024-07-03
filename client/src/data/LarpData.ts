import { Tag, Larp } from "../types";
import { DateTime } from "luxon";

const START = new Date();
const END = new Date(START.getTime() + 3 * 24 * 60 * 60 * 1000);

const Tag1:Tag={
  id:1,
  name:"Tag1"
}
const Tag2:Tag={
  id:2,
  name:"Tag2"
}

const TestLarp1:Larp = {
  id:1,
  title: 'Larp1 names can be long strings that take multiple lines',
  ticketStatus: "LIMITED",
  tags: [Tag1, Tag2],
  start: START,
  end: END ,
  allDay: false,
  imgUrl: "https://picsum.photos/900/800",
  city: "Stratfordshire",
  country: "United Kingdom",
  language: "English",
  description: "This is a description of Larp1",
  organizer:'Test Organizer',
  eventUrl:'https://test.com',
}
const TestLarp2=Object.create(TestLarp1);
TestLarp2.title="Larp2"
TestLarp2.id=2
const TestLarp3=Object.create(TestLarp1);
TestLarp3.title="Larp3"
TestLarp3.id=3


export {TestLarp1, TestLarp2, TestLarp3}