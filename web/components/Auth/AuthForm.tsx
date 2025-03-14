"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "@/hooks/useAuth";

import OtpForm from "./OtpForm";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AuthType } from "@/types/auth";
import Email from "../Icons/AuthForm/Email";
import Lock from "../Icons/AuthForm/Lock";
import ArrowDownLeft from "../Icons/AuthForm/ArrowDownLeft";
import GoogleAuth from "./OAuth/GoogleAuth";
import GithubAuth from "./OAuth/GithubAuth";

import styles from "./index.module.css";
import { Eye, EyeOff } from "lucide-react";

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

  const form = useForm<z.infer<typeof FormSchema>>({
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

  const maskInput = (e: any) => {
    console.log(e.target.value);
    console.log(e.target.selectionStart);

    e.target.value = e.target.value.replace(/./g, "0");
  };

  return (
    <>
      {isVerify && !isPending && !error ? (
        <OtpForm />
      ) : (
        <Card className={styles.card}>
          <CardHeader className={styles.cardHeader}>
            <CardTitle className={styles.cardTitle}>
              {authType === "login" ? "Log in" : "Sign up"}
            </CardTitle>
            <CardDescription className={styles.cardDescription}>
              {authType === "login" ? (
                <p>Enter your details below to sign into your account.</p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <a className={styles.cardDescriptionLink} href="/auth/login">
                    Log in
                  </a>
                </p>
              )}
            </CardDescription>
          </CardHeader>

          <CardContent className={styles.cardContent}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className={styles.formFieldContainer}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={styles.formLabel}>
                          Email
                        </FormLabel>
                        <FormControl className={styles.formControl}>
                          <div className={styles.inputContainer}>
                            <Email className={styles.inputIcon} />
                            <Input className={styles.inputField} {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={styles.formLabel}>
                          Password
                        </FormLabel>
                        <FormControl className={styles.formControl}>
                          <div className={styles.inputContainer}>
                            <Lock className={styles.inputIcon} />
                            <Input
                              onInput={maskInput}
                              className={styles.inputField}
                              {...field}
                            />
                            <button className={styles.inputPasswordReveal}>
                              <Eye size={16} color="#98A2B3" />
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                        <li className={styles.passwordRule}>
                          Minimum 8 characters long
                        </li>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={styles.formLabel}>
                          Confirm Password
                        </FormLabel>
                        <FormControl className={styles.formControl}>
                          <div className={styles.inputContainer}>
                            <Lock className={styles.inputIcon} />
                            <Input className={styles.inputField} {...field} />
                            <button className={styles.inputPasswordReveal}>
                              <EyeOff size={16} color="#98A2B3" />
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {error && <p style={{ color: "red" }}>{error}</p>}
                </div>

                <Button className={styles.formButton} type="submit">
                  {/*
                  {isPending
                    ? authType === "login"
                      ? "Logging in..."
                      : "Signing up..."
                    : authType === "login"
                      ? "Log in"
                      : "Create account"}
                  */}
                  Create account{" "}
                  <div className={styles.buttonIconWrapper}>
                    <ArrowDownLeft className={styles.buttonIcon} />
                  </div>
                </Button>
              </form>
            </Form>

            <p className={styles.continueWithOAuth}>Or continue with</p>

            <div className={styles.oauthContainer}>
              <GoogleAuth />
              <GithubAuth />
            </div>
          </CardContent>

          <CardFooter className={styles.cardFooter}>
            <span>Katha @2025</span>
            <p>A vault system to keep me sane.</p>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default AuthForm;
