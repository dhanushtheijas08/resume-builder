"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { loginAction } from "@/lib/actions/auth-action";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const LoginForm = () => {
  const router = useRouter();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "test@example.com",
      password: "test123456",
    },
  });

  const { execute, status } = useAction(loginAction, {
    onSuccess: ({ data }) => {
      if (data.redirectUrl) {
        router.push(data.redirectUrl);
        toast.success(data.message);
      }
    },
    onError: ({ error }) => {
      toast.error(error.serverError?.message);
      if (error.serverError?.redirectUrl) {
        router.push(error.serverError?.redirectUrl);
      }
    },
  });

  const onSubmit = (data: LoginFormData) => execute(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  {...field}
                  disabled={status === "executing"}
                />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                  disabled={status === "executing"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full mt-2.5"
          variant="primary"
          disabled={status === "executing"}
        >
          {status === "executing" ? <Spinner /> : "Login"}
        </Button>
      </form>
    </Form>
  );
};
