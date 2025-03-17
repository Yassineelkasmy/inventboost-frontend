import type React from "react"

import { useState, useEffect } from "react"
import { Home, Calendar, FileText, Users, Settings, LogOut, Menu } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "../lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import { useRouter } from "@tanstack/react-router"

interface NavItem {
    title: string
    href: string
    icon: React.ReactNode
}

export function SidebarNav() {
    const pathname = '/dashboard'
    const [isMobile, setIsMobile] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const router = useRouter()

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkIfMobile()

        window.addEventListener("resize", checkIfMobile)

        return () => {
            window.removeEventListener("resize", checkIfMobile)
        }
    }, [])

    const navItems: NavItem[] = [
        {
            title: "Home",
            href: "/dashboard",
            icon: <Home className="h-5 w-5" />,
        },
        {
            title: "Appointment",
            href: "",
            icon: <Calendar className="h-5 w-5" />,
        },
        {
            title: "Health Record",
            href: "",

            icon: <FileText className="h-5 w-5" />,
        },
        {
            title: "Insurances",
            href: "",

            icon: <Users className="h-5 w-5" />,
        },
        {
            title: "Settings",
            href: "",
            icon: <Settings className="h-5 w-5" />,
        },
    ]

    const NavLinks = () => (
        <>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white">Acme</h1>
            </div>

            <nav className="flex flex-col space-y-1 flex-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href

                    return (
                        <a
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                                isActive ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800/50",
                            )}
                            onClick={() => setIsOpen(false)}
                        >
                            {item.icon}
                            {item.title}
                        </a>
                    )
                })}
            </nav>

            <Button
                variant="ghost"
                className="mt-auto w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800/50"
                onClick={() => {
                    signOut(auth).then(() => {
                        router.navigate({ to: '/login' })
                    })
                }}
            >
                <LogOut className="mr-2 h-5 w-5" />
                Logout
            </Button>
        </>
    )

    if (isMobile) {
        return (
            <>
                <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-4 bg-black border-b border-gray-800">
                    <h1 className="text-xl font-bold text-white">Acme</h1>

                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-white">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-64 p-6 bg-black border-r border-gray-800 flex flex-col h-full">
                            <NavLinks />
                        </SheetContent>
                    </Sheet>
                </div>

                <div className="h-16"></div>
            </>
        )
    }

    return (
        <div className="hidden md:flex flex-col h-screen w-64 bg-black border-r border-gray-800 p-6 fixed">
            <NavLinks />
        </div>
    )
}

