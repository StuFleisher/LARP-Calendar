import React from "react";
import { Formik } from "formik";

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

  return (

    <Formik
      initialValues={larp}
      onSubmit={async (values) => await onSubmitCallback(values as T)}
      validationSchema={LarpFormSchema}
    >
      {children}
    </Formik>
  );
}

export { LarpFormProvider };