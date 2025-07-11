"use client";

import React from "react";
import { LogIn, VideoIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import { HeaderUserButton } from "@/modules/dashboard/ui/components/Header-user-button";

export default function Header() {
  const path = usePathname();
  const { data, isPending } = authClient.useSession();

  return (
    <header className="fixed top-0 w-full border-b bg-white/95 backdrop-blur z-50 supports-[backdrop-filter]:bg-white/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={"/logo.svg"}
            alt="Vehiql Logo"
            width={200}
            height={60}
            className="h-11 w-auto object-contain"
          />
          <p className="text-2xl font-semibold"> Gather.AI </p>
        </Link>

        {path === "/" && (
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-green-600 transition"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-green-600 transition"
            >
              How It Works
            </Link>
          </div>
        )}

        <div className="flex items-center gap-4">
          {!isPending && data?.user ? (
            <>
              <Link href="/meetings">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2 hover:text-green-600 hover:border-green-600 transition"
                >
                 <VideoIcon className="h-4 w-4 text-blue-700" />
                  Meetings
                </Button>
                <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                  <VideoIcon className="h-4 w-4 text-blue-600" />
                </Button>
              </Link>
              <HeaderUserButton />
            </>
          ) : (
            <Link href="/sign-in">
              <Button
                variant="outline"
                className="hidden md:inline-flex items-center gap-2 hover:text-green-600 hover:border-green-600 transition"
              >
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
              <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                <LogIn className="h-4 w-4 text-green-600" />
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
