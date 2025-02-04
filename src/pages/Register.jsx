import { useState } from "react";
import Form from "../Components/ui/Form.tsx";
import FormInput from "../Components/ui/FormInput";
import { GetAuth } from "../Context/AuthContext";
import { validateInputs } from "../util/validate";
import { registerSchema } from "../config/schema";
import { GetNotifi } from "../Context/NotifiContext";

let Register = () => {
  let { addNotif } = GetNotifi();

  let { registerUser } = GetAuth();

  const [formData, setFormData] = useState({
    email: { value: "", error: null },
    password: { value: "", error: null },
    confirmPassword: { value: "", error: null },
    username: { value: "", error: null },
    fullName: { value: "", error: null },
  });

  let handleChange = (e) => {
    let { value, name } = e.target;

    let error = validateInputs(name, value);

    if (name === "confirmPassword") {
      if (value !== formData.password.value) error = "Password Dose not Match";
    }

    setFormData((prev) => ({
      ...prev,
      [name]: { value, error },
    }));
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    let formValues = {
      email: formData.email.value,
      password: formData.password.value,
      fullName: formData.fullName.value,
      username: formData.username.value,
    };

    let response = registerSchema.safeParse(formValues);

    if (formValues.password !== formData.confirmPassword.value)
      response.success = false;
    if (!response.success) {
      addNotif({
        type: "danger",
        title: "Invalid Inputs",
        desc: "Form inputs are not Valid",
      });
      return;
    }
    let { email, password, username, fullName } = formValues;
    await registerUser(email, password, username, fullName);
  };

  return (
    <section className="flex h-full w-full items-center justify-center">
      <Form title="Register" onSubmit={handleSubmit}>
        <FormInput
          label="Enter Full Name"
          type="text"
          name="fullName"
          placeholder="Name Family"
          value={formData.fullName.value}
          error={formData.fullName.error}
          onChange={handleChange}
        />
        <FormInput
          label="Enter Email"
          type="Email"
          name="email"
          placeholder="example@gamil.com"
          value={formData.email.value}
          error={formData.email.error}
          onChange={handleChange}
        />
        <FormInput
          label="Enter Username"
          type="text"
          name="username"
          placeholder="example_123"
          value={formData.username.value}
          error={formData.username.error}
          onChange={handleChange}
        />
        <FormInput
          label="Enter Password"
          type="password"
          name="password"
          placeholder="123456"
          value={formData.password.value}
          error={formData.password.error}
          onChange={handleChange}
        />
        <FormInput
          label="Confirm Password"
          type="Password"
          name="confirmPassword"
          placeholder="123456"
          value={formData.confirmPassword.value}
          error={formData.confirmPassword.error}
          onChange={handleChange}
        />
      </Form>
    </section>
  );
};

export default Register;
