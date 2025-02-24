import { emailSchema } from "../config/schema";

export let validateInputs = (name, value) => {
  if (value.length === 0) return null;
  if (name === "email") {
    let response = emailSchema.safeParse(value);
    if (!response.success) {
      return "Email is Not Valid";
    }
  }
  if (name === "password") {
    if (value.length < 6) {
      return "Password must be at least 6 char";
    }
  }
  if (name === "username") {
    if (value.includes(" ")) return "Username can't contains space";
    if (value.includes("-")) return "Username can't contains '-'";
    if (value.length < 4) return "Username must be at least 4 char";
    if (value.length > 17) return "Username can't be more than 17 char";
  }
  if (name === "fullName") {
    if (value.trim().length < 3) return "full Name must be at least 3 char";
    if (value.trim().length > 18)
      return "full Name can't be grater than 17 char";
  }
  return null;
};

export let validateNewBookInputs = (name, value) => {
  if (value.length === 0) return null;
  if (name === "price") {
    if (parseFloat(value) <= 0) return "Price can't be 0 or negative";
  }
  return null;
};
