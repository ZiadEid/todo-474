import { ErrorMessage, Field, Form, Formik } from "formik";
import Button from "../../../components/shared/Button";
import { loginValidation } from "./validation";

export default function Login() {
  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <div className="h-full flex justify-center items-center">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={loginValidation}
      >
        <Form className="bg-white w-120 max-w-full p-5 rounded-lg flex flex-col gap-5">
          <h2 className="text-center text-2xl font-bold">Welcome</h2>
          <Field
            name="email"
            className="outline-0 border focus:border-2 border-gray-300 focus:border-indigo-500 rounded-lg py-1 px-2"
            placeholder="email:"
          />
          <ErrorMessage
            name="email"
            component={"p"}
            className="text-red-500 font-bold"
          />
          <Field
            name="password"
            className="outline-0 border focus:border-2 border-gray-300 focus:border-indigo-500 rounded-lg py-1 px-2"
            type="password"
            placeholder="password:"
          />
          <ErrorMessage
            name="password"
            component={"p"}
            className="text-red-500 font-bold"
          />
          <Button width="w-full">Login</Button>
        </Form>
      </Formik>
    </div>
  );
}
