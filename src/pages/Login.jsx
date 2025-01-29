import { useState } from "react";
import Form from "../Components/ui/Form.tsx";
import FormInput from "../Components/ui/FormInput.jsx";
import { GetAuth } from "../Context/AuthContext.jsx";
import { loginSchema } from "../config/schema.js";
import { GetNotifi } from "../Context/NotifiContext.jsx";
import { validateInputs } from "../util/validate.js";

let Login = () => {
  let { addNotif } = GetNotifi();

  let [formData, setFormData] = useState({
    email: { value: "", error: null },
    password: { value: "", error: null },
  });

  let { loginUser } = GetAuth();

  let handleChange = (e) => {
    let { value, name } = e.target;

    let error = validateInputs(name, value);

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
    };
    let response = loginSchema.safeParse(formValues);

    if (!response.success) {
      addNotif({
        type: "danger",
        title: "Invalid Inputs",
        desc: "Form inputs are not Valid",
      });
      return;
    }

    let { email, password } = response.data;
    loginUser(email, password);
  };
  return (
    <section className="flex min-h-full w-full flex-1 items-center justify-center py-3">
      <Form title="Log-in" onSubmit={handleSubmit}>
        <FormInput
          label="Enter Your Email"
          name="email"
          type="email"
          placeholder="example@gmail.com"
          error={formData.email.error}
          value={formData.email.value}
          onChange={handleChange}
        />
        <FormInput
          label="Enter Your Password"
          type="password"
          name="password"
          placeholder="123456"
          error={formData.password.error}
          value={formData.password.value}
          onChange={handleChange}
        />
      </Form>
    </section>
  );
};

export default Login;
