import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Form,
  Input,
} from "@nextui-org/react";

import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerFormSchema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
  username: z.string().min(4),
  password: z.string().min(8),
  role: z.string().nonempty("Can not be empty"),
});

export const Register = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      role: "",
    },
    resolver: zodResolver(registerFormSchema),
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (formData) => {
    try {
      const response = await axios.post("/api/v1/auth/register", formData);

      if (response?.status === 201) {
        toast.success("Register success. Please login.");
      }
    } catch (error) {
      const errMessage =
        error.response?.data?.status?.description ||
        "An unexpected error occurred.";
      console.log(error);
      setErrorMessage(errMessage);
    } finally {
      form.reset();
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center h-screen bg-primary gap-9">
      <h1
        className=" text-4xl font-bold text-white"
        style={{
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        Enigma Laundry
      </h1>
      <Card className="w-[400px] sm:min-w-[300px] bg-blue-200 p-5 border-2 border-white">
        <CardBody>
          <Form
            className=" flex flex-col gap-5"
            onSubmit={form.handleSubmit(handleRegister)}
          >
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Input
                    {...field}
                    label="Name"
                    className="font-semibold"
                    size="sm"
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                  />
                );
              }}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Input
                    {...field}
                    label="Email"
                    className="font-semibold"
                    size="sm"
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                  />
                );
              }}
            />
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Input
                    {...field}
                    label="Username"
                    className="font-semibold"
                    size="sm"
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                  />
                );
              }}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Input
                    {...field}
                    label="Password"
                    type="password"
                    className="font-semibold"
                    size="sm"
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                  />
                );
              }}
            />
            <Controller
              name="role"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <div className="w-full">
                    <select
                      className="font-semibold w-full p-2 rounded-xl text-gray-500 text-sm"
                      {...field}
                      label="Role"
                      required
                    >
                      <option value="">Pilih role</option>
                      <option value="admin">Admin</option>
                      <option value="employee">Employee</option>
                    </select>
                    {fieldState.error && (
                      <span className="text-red-500 text-tiny font-semibold">
                        {fieldState.error.message}
                      </span>
                    )}
                  </div>
                );
              }}
            />

            <Button
              color="primary"
              className="w-full font-semibold text-white border-2 border-white"
              type="submit"
            >
              Register
            </Button>
          </Form>
          <p className=" text-danger-500 text-center text-tiny font-semibold">
            {errorMessage}
          </p>
        </CardBody>
        <CardFooter>
          <p>
            Already have an account?{" "}
            <Link
              className=" text-primary font-semibold hover:text-white"
              to="/login"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
      <ToastContainer position="top-center" />
    </div>
  );
};
