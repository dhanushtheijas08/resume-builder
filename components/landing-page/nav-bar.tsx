"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import {
  ChevronsUpDown,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  User2,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Kbd } from "../ui/kbd";
import { useHotkeys } from "react-hotkeys-hook";

export const NavBar = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const pathname = usePathname();

  useHotkeys(["l", "shift+l", "ctrl+l", "command+l"], () => {
    if (!user) router.push("/login");
  });

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
      <nav className="container mx-auto flex items-center justify-between px-3 sm:px-4 md:px-6 h-full">
        {/* Logo */}
        <Link
          href="/"
          className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold flex items-center gap-1 sm:gap-2 shrink-0"
        >
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
        <div className="md:hidden shrink-0">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[350px] gap-2.5 p-0 border-l border-border bg-background flex flex-col h-full"
            >
              <div className="p-4 border-b border-border">
                <SheetTitle className="text-left text-lg font-bold flex items-center gap-2">
                  Coder CV
                </SheetTitle>
              </div>

              <div className="flex-1 overflow-y-auto px-2">
                <div className="flex flex-col gap-2">
                  <Link
                    href="/"
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 text-muted-foreground text-sm font-medium hover:bg-muted rounded-md transition-colors",
                      pathname === "/" && "bg-muted text-white/95",
                    )}
                  >
                    <Home className="size-4" />
                    Home
                  </Link>
                  {user && (
                    <Link
                      href="/dashboard"
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 text-muted-foreground text-sm font-medium hover:bg-muted rounded-md transition-colors",
                        pathname === "/dashboard" && "bg-muted text-white/95",
                      )}
                    >
                      <LayoutDashboard className="size-4" />
                      Dashboard
                    </Link>
                  )}

                  <Link
                    href="/templates"
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 text-muted-foreground text-sm font-medium hover:bg-muted rounded-md transition-colors",
                      pathname.startsWith("/templates") &&
                        "bg-muted text-white/95",
                    )}
                  >
                    <FileText className="size-4" />
                    Templates
                  </Link>

                  {user && (
                    <Link
                      href="/settings"
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 text-muted-foreground text-sm font-medium hover:bg-muted rounded-md transition-colors",
                        pathname.startsWith("/settings") &&
                          "bg-muted text-white/95",
                      )}
                    >
                      <Settings className="size-4" />
                      Settings
                    </Link>
                  )}
                </div>
              </div>

              <div className="border-t border-border bg-muted/20">
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground w-full h-15"
                      >
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
                        <ChevronsUpDown className="ml-auto size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className=" min-w-64 w-full rounded-lg ml-2"
                      side="bottom"
                      align="start"
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
                ) : (
                  <div className="flex flex-col gap-3 p-6">
                    <Link href="/login" className="w-full">
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" className="w-full">
                      <Button className="w-full" variant="primary">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};
