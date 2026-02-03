"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Menu,
  LogOut,
  LayoutDashboard,
  FileText,
  ChevronsUpDown,
  User2,
  Settings,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Kbd } from "../ui/kbd";

export const NavBar = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const logoutUser = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <header className="flex justify-between items-center border-b border-border fixed top-0 left-0 right-0 z-50 blur-effect bg-background/50 h-16 w-full">
      <nav className="container mx-auto  flex items-center justify-between px-4 md:px-6 h-full">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold flex items-center gap-2">
          Coder CV
        </Link>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {isPending ? (
            <div className="flex items-center gap-4">
              <Skeleton className="h-9 w-20 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-full" />
            </div>
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 rounded-lg cursor-pointer">
                    <AvatarImage
                      src={user?.image || "/diverse-user-avatars.png"}
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback className="rounded-lg">
                      {user?.name
                        ? user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className=" w-[--radix-dropdown-menu-trigger-width] min-w-60 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={user?.image || "/diverse-user-avatars.png"}
                          alt={user?.name || "User"}
                        />
                        <AvatarFallback className="rounded-lg">
                          {user?.name
                            ? user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                            : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {user?.name || "User"}
                        </span>
                        <span className="truncate text-xs">
                          {user?.email || "user@example.com"}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <User2 className="mr-2 size-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 size-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logoutUser}>
                    <LogOut className="mr-2 size-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login <Kbd className="ml-1 mt-0.5">L</Kbd>
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="text-left text-lg font-bold">
                Menu
              </SheetTitle>
              <div className="flex flex-col gap-6 mt-8">
                <Link
                  href="/templates"
                  className="text-lg font-medium flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  Templates
                </Link>
                {user ? (
                  <>
                    <div className="h-px bg-border w-full" />
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="h-10 w-10 border border-border">
                        <AvatarImage src={user.image || ""} />
                        <AvatarFallback>
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {user.email}
                        </span>
                      </div>
                    </div>
                    <Link
                      href="/dashboard"
                      className="text-lg font-medium flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      Dashboard
                    </Link>
                    <Button
                      onClick={logoutUser}
                      variant="ghost"
                      className="justify-start px-0 text-lg font-medium text-destructive hover:text-destructive/90 hover:bg-transparent"
                    >
                      <LogOut className="mr-2 h-5 w-5" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="h-px bg-border w-full" />
                    <Link href="/login" className="w-full">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/register" className="w-full">
                      <Button className="w-full">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};
