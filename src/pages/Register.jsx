import { useState } from "react";
import Form from "../Components/ui/Form.tsx";
import FormInput from "../Components/ui/FormInput.jsx";
import { signup } from "../supabase/auth.js";

let Register = () => {
  let [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    fullName: "",
  });

  let handleChange = (e) => {
    let { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    let { email, password, fullName, username } = formData;

    if (email && password) {
      await signup(email, password, fullName, username);
    }
  };

  return (
    <section className="flex h-full w-full items-center justify-center">
      <Form title="Register" onSubmit={handleSubmit}>
        <FormInput
          label="Enter Full Name"
          type="text"
          name="fullName"
          placeholder="Name Family"
          onChange={handleChange}
        />
        <FormInput
          label="Enter Email"
          type="Email"
          name="email"
          placeholder="example@gamil.com"
          onChange={handleChange}
        />
        <FormInput
          label="Enter Username"
          type="text"
          placeholder="example_123"
          onChange={handleChange}
          name="username"
        />
        <FormInput
          label="Enter Password"
          type="Password"
          name="password"
          placeholder="123456"
          onChange={handleChange}
        />
        <FormInput
          label="Confirm Password"
          type="Password"
          placeholder="123456"
        />
      </Form>
    </section>
  );
};

export default Register;
