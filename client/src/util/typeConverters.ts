import { DateTime } from "luxon";
import type { LarpAsJSON, Larp } from "../types"




function JsonToLarp(data:LarpAsJSON):Larp{

  return {
    ...data,
    id: data.id!,
    start: new Date(data.start),
    end: new Date(data.end),
  }
}

/** Converts Luxon DateTime to JS Date */
function LuxonToJSDate(luxonDateTime: DateTime):Date {
  return luxonDateTime.toJSDate();
}

/** Converts JS Date to Luxon DateTime */
function JSDateToLuxon(jsDate: Date):DateTime {
  return DateTime.fromJSDate(jsDate);
}

// function LuxonLarpToJSDateLarp(luxonLarp:Larp):LarpWithJSDates{
//   return {
//     ...luxonLarp,
//     start: LuxonToJSDate(luxonLarp.start),
//     end: LuxonToJSDate(luxonLarp.end)
//   }
// }

// function JSDateLarptoLuxonLarp(jsDateLarp:LarpWithJSDates):Larp{
//   return {
//     ...jsDateLarp,
//     start: JSDateToLuxon(jsDateLarp.start),
//     end: JSDateToLuxon(jsDateLarp.end)
//   }
// }



export {
  JsonToLarp,
  // LuxonLarpToJSDateLarp,
  // JSDateLarptoLuxonLarp,
  JSDateToLuxon,
  LuxonToJSDate,
}