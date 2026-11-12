import { ErrorMessage, Field, Form, Formik } from "formik";
import Button from "../../../components/shared/Button";
import { registerValidation } from "./validation";

export default function Register() {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="h-full flex justify-center items-center">
      <Formik
        initialValues={{
          userName: "",
          email: "",
          password: "",
        }}

        validationSchema={registerValidation}
        onSubmit={handleSubmit}
      >
        <Form className="bg-white w-120 max-w-full p-5 rounded-lg flex flex-col gap-5">
          <h2 className="text-center text-2xl font-bold">Welcome</h2>

          <Field
            name="userName"
            className="outline-0 border focus:border-2 border-gray-300 focus:border-indigo-500 rounded-lg py-1 px-2"
            placeholder="User Name:"
          />
          <ErrorMessage
            name="userName"
            component={"p"}
            className="text-red-500 font-bold"
          />
          <Field
            name="email"
            className="outline-0 border focus:border-2 border-gray-300 focus:border-indigo-500 rounded-lg py-1 px-2"
            placeholder="Email:"
          />
          <ErrorMessage
            name="email"
            component={"p"}
            className="text-red-500 font-bold"
          />
          <Field
            name="password"
            type="password"
            className="outline-0 border focus:border-2 border-gray-300 focus:border-indigo-500 rounded-lg py-1 px-2"
            placeholder="Password:"
          />
          <ErrorMessage
            name="password"
            component={"p"}
            className="text-red-500 font-bold"
          />

          <Button width="w-full">Register</Button>
        </Form>
      </Formik>
    </div>
  );
}
