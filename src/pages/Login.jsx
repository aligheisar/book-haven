import { useState } from "react";
import Form from "../Components/ui/Form.tsx";
import FormInput from "../Components/ui/FormInput.jsx";
import { useNavigate } from "react-router-dom";
import { GetAuth } from "../Context/AuthContext.jsx";

let Login = () => {
  let [formData, setFormData] = useState({ email: "", password: "" });

  let { loginUser } = GetAuth();

  let navigate = useNavigate();

  let handleChange = (e) => {
    let { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    let { email, password } = formData;

    if (email && password) {
      await loginUser(email, password);
    }
    navigate("/");
  };
  return (
    <section className="flex min-h-full w-full flex-1 items-center justify-center py-3">
      <Form title="Log-in" onSubmit={handleSubmit}>
        <FormInput
          label="Enter Your Email"
          name="email"
          type="email"
          placeholder="example@gmail.com"
          onChange={handleChange}
        />
        <FormInput
          label="Enter Your Password"
          type="Password"
          name="password"
          placeholder="123456"
          onChange={handleChange}
        />
      </Form>
    </section>
  );
};

export default Login;
