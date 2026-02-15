import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./login/login-form";
import { RegisterForm } from "./register/register-form";
import { SocialProvider } from "./social-provider";
import Link from "next/link";

export const AuthCard = ({ type }: { type: "login" | "register" }) => {
  return (
    <Card className="w-full max-w-120 border-none bg-transparent shadow-none sm:bg-card  sm:border sm:shadow-sm gap-3 sm:gap-6">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-2xl font-bold text-center sm:text-left">
          {type === "login" ? "Login to your account" : "Create an account"}
        </CardTitle>
        <CardDescription className="hidden sm:block">
          {type === "login"
            ? "Enter your email below to login to your account"
            : "Enter your email below to create an account"}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <SocialProvider />
        {/* Separator */}
        <div className="relative my-4 sm:my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              OR CONTINUE WITH
            </span>
          </div>
        </div>

        {/* Form */}
        {type === "login" ? <LoginForm /> : <RegisterForm />}
      </CardContent>

      <CardFooter className="flex justify-center">
        <p className="text-center text-sm text-muted-foreground border-none  sm:border-t pt-1.5 w-full">
          {type === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <Link
            href={type === "login" ? "/register" : "/login"}
            className="text-primary underline ml-1 hover:text-primary/80 transition-colors"
          >
            {type === "login" ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
