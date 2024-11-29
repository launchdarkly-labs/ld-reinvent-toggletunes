"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";

import LoginContext from "@/lib/LoginContext";
import { PERSONA_ROLE_USER, PERSONA_ROLE_DEVELOPER } from "@/lib/constant";
import { Persona } from "@/lib/typesInterface";
import { Search, User } from "lucide-react";

export default function Navbar({
  releaseReleaseGuardianButton,
  submitReleaseGuardianQuery,
  totalPointAccumulation,
}: {
  releaseReleaseGuardianButton: boolean;
  submitReleaseGuardianQuery: any;
  totalPointAccumulation?: number;
}) {
  const { loginUser, userObject, allUsers } = useContext(LoginContext);

  const personaClicked = (): void => {
    if (userObject.personarole === PERSONA_ROLE_USER) {
      // @ts-ignore
      const foundPersona: Persona = allUsers?.find((persona) =>
        persona?.personarole?.includes(PERSONA_ROLE_DEVELOPER)
      );
      loginUser(foundPersona.personaemail);
    }

    if (userObject.personarole === PERSONA_ROLE_DEVELOPER) {
      // @ts-ignore
      const foundPersona: Persona = allUsers?.find((persona) =>
        persona?.personarole?.includes(PERSONA_ROLE_USER)
      );
      loginUser(foundPersona.personaemail);
    }
  };
  //TODO: the search result here could also be fed into AI
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your search logic here
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav className="flex items-center justify-between px-4 pt-2 pb-1 ">
      {/* <Link href="/" className="text-2xl font-bold">
        Logo
      </Link> */}
      <div className="empty"></div>
      <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4 ml-[14rem]">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="What do you want to play?"
            className="pl-10 pr-4 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>

      <div className="flex items-center">
        {releaseReleaseGuardianButton && (
          <button
            onClick={() => submitReleaseGuardianQuery()}
            className="mr-3 p-2 bg-red-500 rounded-full hover:brightness-125 active:bg-red-700"
          >
            Validate Release Guardian
          </button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={() => personaClicked()}>
            <div className="flex items-center cursor-pointer">
              <h3 className="mr-3 ">
                {userObject.personatier}, {userObject.personarole}
              </h3>
              <Avatar>
                <AvatarFallback>
                  <img src={userObject.personaimage} className="w-8 h-8 bg-blue-500 rounded-full" />
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          {/* <DropdownMenuContent align="end" className="w-56 bg-red-500">
          {isLoggedIn ? (
            <>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </>
          ) : (
            <form onSubmit={handleLogin} className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          )}
        </DropdownMenuContent> */}
        </DropdownMenu>
      </div>
    </nav>
  );
}
