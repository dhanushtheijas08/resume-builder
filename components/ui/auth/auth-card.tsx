import { GitHubIcon } from "@/components/icons/github";
import { GoogleIcon } from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./login/login-form";
import { RegisterForm } from "./register/register-form";

export const AuthCard = ({ type }: { type: "login" | "register" }) => {
  return (
    <Card className="w-full max-w-120">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {type === "login" ? "Login to your account" : "Create an account"}
        </CardTitle>
        <CardDescription>
          {type === "login"
            ? "Enter your email below to login to your account"
            : "Enter your email below to create an account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline-2"
            className="flex-1 font-semibold"
            // onClick={() => handleSocialLogin("github")}
          >
            <GitHubIcon />
            GitHub
          </Button>
          <Button
            type="button"
            variant="outline-2"
            className="flex-1 font-semibold"
            // onClick={() => handleSocialLogin("google")}
          >
            <GoogleIcon />
            Google
          </Button>
        </div>

        {/* Separator */}
        <div className="relative my-6">
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
    </Card>
  );
};
