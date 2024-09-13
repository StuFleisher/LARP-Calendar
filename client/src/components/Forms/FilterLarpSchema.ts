import * as yup from 'yup';
import { TicketStatus } from '../../types';

const FilterLarpSchema = yup.object({
  term: yup.string(),
  title: yup.string(),
  ticketStatus: yup
    .mixed<TicketStatus>()
    .oneOf(["AVAILABLE", "LIMITED", "SOLD_OUT"]),
  tags: yup.string(),
  startBefore: yup
    .date(),
  startAfter: yup
    .date(),
  endBefore: yup
    .date(),
  endAfter: yup
    .date(),
  allDay: yup.boolean(),
  city: yup.string(),
  country: yup.string(),
  language: yup.string(),
  org: yup.string(),
});

export default FilterLarpSchema;