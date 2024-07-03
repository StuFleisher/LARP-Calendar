import { DateTime } from "luxon";
import type { LarpAsJSON, Larp } from "../types"

function JsonToLarp(data:LarpAsJSON):Larp{

  return {
    ...data,
    id: data.id!,
    start: DateTime.fromISO(data.start),
    end: DateTime.fromISO(data.end)
  }
}

export {JsonToLarp}