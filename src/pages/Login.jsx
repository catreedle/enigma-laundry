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
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";

export const Login = ({ setIsLoggedIn }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const loginFormSchema = z.object({
    username: z.string().min(4),
    password: z.string().min(8),
  });

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });

  const handleLogin = async (formData) => {
    try {
      const response = await axios.post("/api/v1/auth/login", formData);

      const token = response.data.data.token;
      localStorage.setItem("authToken", token);

      // Set Authorization header for all future requests
      axios.defaults.headers["Authorization"] = `Bearer ${token}`;
      setErrorMessage("");

      setIsLoggedIn(true);
      navigate("/", { replace: true });
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
            onSubmit={form.handleSubmit(handleLogin)}
          >
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Input
                    {...field}
                    className="font-semibold"
                    label="Username"
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
                    className="font-semibold"
                    type="password"
                    label="Password"
                    size="sm"
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                  />
                );
              }}
            />
            <Button
              color="primary"
              className="w-full font-semibold text-white border-2 border-white"
              type="submit"
            >
              Login
            </Button>
          </Form>
          <p className=" text-danger-500 font-semibold text-tiny text-center">
            {errorMessage}
          </p>
        </CardBody>
        <CardFooter>
          <p>
            Don&apos;t have an account?{" "}
            <Link
              className=" text-primary font-semibold hover:text-white"
              to="/register"
            >
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

Login.propTypes = {
  setIsLoggedIn: PropTypes.func,
};
