import { emailSchema } from "../config/schema";

export let validateInputs = (name, value) => {
  if (name === "email") {
    if (value.length > 0) {
      let response = emailSchema.safeParse(value);
      if (!response.success) {
        return "Email is Not Valid";
      }
    }
  } else if (name === "password") {
    if (value.length > 0) {
      if (value.length < 6) {
        return "Password must be at least 6 char";
      }
    }
  }
};
