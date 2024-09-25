import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from  '@/components/table'
import { BarChart, Users, Server, Search, Bell, Menu, Moon, Sun, Play, XIcon, RotateCcw, RefreshCw } from "lucide-react"
import Link from 'next/link'

export default function GameAdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <div className="flex h-screen bg-gray-900 text-white font-mono">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-center h-16 bg-purple-700">
          <span className="text-white text-2xl font-semibold">Game Admin</span>
        </div>
        <nav className="mt-8">
          <Link href="#" className="flex items-center px-6 py-2 text-gray-300 hover:bg-gray-700">
            <BarChart className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link href="#" className="flex items-center px-6 py-2 text-gray-300 hover:bg-gray-700">
            <Users className="w-5 h-5 mr-3" />
            Players
          </Link>
          <Link href="#" className="flex items-center px-6 py-2 text-gray-300 hover:bg-gray-700">
            <Server className="w-5 h-5 mr-3" />
            Servers
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-900">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-gray-800">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="lg:hidden mr-2 text-white" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
            <div className="relative">
              <Search className="absolute left-2 top-2 h-5 w-5 text-gray-400" />
              <Input type="search" placeholder="Search..." className="pl-10 pr-4 bg-gray-700 text-white border-gray-600 focus:border-purple-500" />
            </div>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2 text-white">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <img src="/placeholder.svg?height=32&width=32" alt="Admin" className="rounded-full" />
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-semibold text-white mb-6">Dashboard</h1>
            
            {/* Stats Cards */}
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
              <StatCard title="Total Players" value="10,245" icon={<Users className="h-8 w-8" />} />
              <StatCard title="Active Servers" value="23" icon={<Server className="h-8 w-8" />} />
              <StatCard title="Daily Active Users" value="5,678" icon={<BarChart className="h-8 w-8" />} />
              <StatCard title="Revenue" value="$12,345" icon={<BarChart className="h-8 w-8" />} />
            </div>

            {/* Game Controls */}
            <div className="bg-gray-800 shadow rounded-lg p-4 mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Game Controls</h2>
              <div className="flex flex-wrap gap-4">
                <Button className="flex items-center bg-green-600 hover:bg-green-700 text-white">
                  <Play className="mr-2 h-4 w-4" /> Start
                </Button>
                <Button className="flex items-center bg-red-600 hover:bg-red-700 text-white">
                  <XIcon className="mr-2 h-4 w-4" /> Stop
                </Button>
                <Button className="flex items-center bg-yellow-600 hover:bg-yellow-700 text-white">
                  <RotateCcw className="mr-2 h-4 w-4" /> Reset
                </Button>
                <Button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white">
                  <RefreshCw className="mr-2 h-4 w-4" /> Reload
                </Button>
              </div>
            </div>

            {/* Player Management */}
            <div className="bg-gray-800 shadow rounded-lg p-4 mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Player Management</h2>
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-700">
                    <TableHead className="text-gray-300">Player ID</TableHead>
                    <TableHead className="text-gray-300">Username</TableHead>
                    <TableHead className="text-gray-300">Level</TableHead>
                    <TableHead className="text-gray-300">Last Login</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-b border-gray-700">
                    <TableCell className="text-gray-300">001</TableCell>
                    <TableCell className="text-gray-300">GameMaster99</TableCell>
                    <TableCell className="text-gray-300">75</TableCell>
                    <TableCell className="text-gray-300">2023-09-25 14:30</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white">View</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-b border-gray-700">
                    <TableCell className="text-gray-300">002</TableCell>
                    <TableCell className="text-gray-300">EpicPlayer123</TableCell>
                    <TableCell className="text-gray-300">42</TableCell>
                    <TableCell className="text-gray-300">2023-09-25 12:15</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white">View</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-b border-gray-700">
                    <TableCell className="text-gray-300">003</TableCell>
                    <TableCell className="text-gray-300">NoobSlayer420</TableCell>
                    <TableCell className="text-gray-300">88</TableCell>
                    <TableCell className="text-gray-300">2023-09-25 15:45</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white">View</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Server Status */}
            <div className="bg-gray-800 shadow rounded-lg p-4">
              <h2 className="text-xl font-semibold text-white mb-4">Server Status</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <ServerStatusCard name="US East" status="Online" players="1,234" />
                <ServerStatusCard name="EU West" status="Online" players="2,345" />
                <ServerStatusCard name="Asia Pacific" status="Maintenance" players="0" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow p-4 flex items-center">
      <div className="p-3 rounded-full bg-purple-600 bg-opacity-75">
        {icon}
      </div>
      <div className="ml-4">
        <p className="mb-2 text-sm font-medium text-gray-400">{title}</p>
        <p className="text-lg font-semibold text-white">{value}</p>
      </div>
    </div>
  )
}

function ServerStatusCard({ name, status, players }) {
  const statusColor = status === 'Online' ? 'text-green-400' : 'text-red-400'
  return (
    <div className="bg-gray-700 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>
      <p className={`text-sm font-medium ${statusColor}`}>{status}</p>
      <p className="text-sm text-gray-300">Active Players: {players}</p>
    </div>
  )
}