"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input"
import { Label } from "./ui/label"
import { User } from "lucide-react"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement your login logic here
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    // Implement your logout logic here
    setIsLoggedIn(false)
  }

  return (
    <nav className="flex items-center justify-end px-4 py-2 bg-red-500">
      {/* <Link href="/" className="text-2xl font-bold">
        Logo
      </Link> */}
      <h3 className="mr-3">User</h3>
      <DropdownMenu >
        <DropdownMenuTrigger asChild >
          <Avatar className="cursor-pointer">
            <AvatarFallback>
              <User className="w-8 h-8 bg-blue-500 rounded-full p-2" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-red-500">
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
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}