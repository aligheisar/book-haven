import { useState } from "react";
import Form from "../components/ui/Form.tsx";
import FormInput from "../components/ui/FormInput";
import { GetAuth } from "../context/AuthContext";
import { loginSchema } from "../config/schema";
import { GetNotifi } from "../context/NotifiContext";
import { validateInputs } from "../util/validate";

let Login = () => {
  let { addNotif } = GetNotifi();

  const [formData, setFormData] = useState({
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
