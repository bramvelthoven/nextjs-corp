import { FcGoogle } from "react-icons/fc";
import { Mail, Lock, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function Login() {
  return (
    <section className="py-8 min-h-screen flex items-start justify-start">
      <div className="container flex justify-center align-items-start">
        <div className="w-full max-w-sm rounded-md p-8 shadow border-1 border-secondary-accent">
          <div className="mb-6 flex flex-col items-center">
            <h1 className="mb-2 text-2xl font-bold">Login</h1>
          </div>
          <form className="grid gap-4">
            <div className="relative">
              <Input type="email" placeholder="Email" required className="pl-10" />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            </div>
            <div className="relative">
              <Input type="password" placeholder="Password" required className="pl-10" />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none"
                >
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <Button type="submit" className="mt-2 w-full">
              Log in
            </Button>
            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
              <FcGoogle className="size-5" />
              Log in with Google
            </Button>
          </form>
          <div className="mx-auto mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
            <p>Don't have an account?</p>
            <a href="/signup" className="flex items-center font-medium text-secondary-accent hover:underline gap-1">
              <UserPlus className="size-4" />
              Sign up
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}