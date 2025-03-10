"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "@/hooks/useAuth";

import OtpForm from "./OtpForm";
import FormField from "./AuthFormField";
import { AuthType } from "@/types/auth";

const FormSchema = z
  .object({
    email: z.string().email({ message: "Invalid Email Address" }),
    password: z.string().min(8, { message: "Password is too short" }),
    confirmPassword: z.string().min(8, { message: "Password is too short" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does't match",
    path: ["confirmPassword"],
  });

type AuthFormProp = { authType: AuthType };

const AuthForm: FC<AuthFormProp> = ({ authType }) => {
  const [isVerify, setIsVerify] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { error, isPending, handleAuth } = useAuth(authType);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    handleAuth(data.email, data.password);
    if (authType === "signup") {
      setIsVerify(!isVerify);
    }
  };

  return (
    <>
      {isVerify && !isPending && !error ? (
        <OtpForm />
      ) : (
        <form className="flex flex-col">
          <label htmlFor="email">Email:</label>
          <FormField
            type="email"
            name="email"
            register={register}
            error={errors.email}
          />
          <label htmlFor="password">Password:</label>
          <FormField
            type="password"
            name="password"
            register={register}
            error={errors.password}
          />
          <label htmlFor="confirm-password">Confirm Password:</label>
          <FormField
            type="password"
            name="confirmPassword"
            register={register}
            error={errors.confirmPassword}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button
            type="button"
            onClick={handleSubmit((data) => onSubmit(data))}
          >
            {isPending
              ? authType === "login"
                ? "Logging in..."
                : "Signing up..."
              : authType === "login"
                ? "Log in"
                : "Sign up"}
          </button>

          {authType === "signup" ? (
            <a className="font-helvetica tracking-wider" href="/auth/login">
              Go to Login
            </a>
          ) : (
            <p>
              Don't have an account? <a href="/auth/sign-up">Sign up</a>
            </p>
          )}
        </form>
      )}
    </>
  );
};

export default AuthForm;
