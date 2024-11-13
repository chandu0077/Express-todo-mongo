import * as yup from "yup";

export const todoForm = yup.object().shape({
  _id: yup.string().trim().notRequired(),
  title: yup.string().trim().min(2).required("This field can't be empty."),
});
