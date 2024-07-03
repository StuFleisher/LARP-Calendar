import React from "react";
import { Formik } from "formik";
import { JSDateToLuxon, LuxonToJSDate } from "../util/typeConverters";

import LarpFormSchema from "../util/LarpFormSchema";
import { Larp, LarpForCreate, LarpForUpdate } from "../types";

type Props<T> = {
  children: React.ReactNode;
  larp: T;
  onSubmitCallback: ((formData: T) => Promise<void>);
};

function LarpFormProvider<T extends Larp | LarpForCreate | LarpForUpdate>(
  { larp, onSubmitCallback, children }: Props<T>
) {

  function convertToLuxonDates(larp:T){
    return {
      ...larp,
      start: larp.start ? JSDateToLuxon(larp.start) : undefined,
      end: larp.end ? JSDateToLuxon(larp.end) : undefined,
    }
  }

  function convertToJSDates(values:any):T{
    return {
      ...values,
      start: values.start ? LuxonToJSDate(values.start) : undefined,
      end: values.end ? LuxonToJSDate(values.end) : undefined,
    }
  }

  return (

    <Formik
      initialValues={convertToLuxonDates(larp)}
      onSubmit={async (values) => await onSubmitCallback(convertToJSDates(values as T))}
      validationSchema={LarpFormSchema}
    >
      {children}
    </Formik>
  );
}

export { LarpFormProvider };