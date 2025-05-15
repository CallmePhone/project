'use client';
import { useState } from "react";
import { Menu, X, Home, Car, History, Settings } from "lucide-react";
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
    useUser
} from '@clerk/nextjs';
import Link from "next/link";

const Navbar = ({ role = "user" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    const adminLinks = [
        { name: "จัดการอะไหล่", href: "/admin/parts", icon: <Settings size={18} /> },
        { name: "จัดการยานพาหนะ", href: "/admin/vehicles", icon: <Car size={18} /> },
    ];

    const userLinks = [
        { name: "หน้าหลัก", href: "/show", icon: <Home size={18} /> },
        { name: "ยานพาหนะของฉัน", href: "/vehicles", icon: <Car size={18} /> },
        { name: "ประวัติการเปลี่ยนอะไหล่", href: "/partHistoryPage", icon: <History size={18} /> },
    ];

    const links = role === "admin" ? adminLinks : userLinks;

    return (
        <ClerkProvider>
            <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-4 py-3 z-50">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between">
                    {/* Logo and Toggle */}
                    <div className="flex items-center justify-between w-full md:w-auto">
                        <div className="flex items-center space-x-2 text-2xl font-bold text-blue-600">
                            <Car size={28} />
                            <Link href='/'><span>ระบบจัดการอะไหล่รถ</span></Link>
                        </div>
                        <button
                            className="md:hidden text-gray-700"
                            onClick={toggleMenu}
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex flex-1 justify-center space-x-6 mt-4 md:mt-0">
                        <SignedIn>
                            {links.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="flex items-center space-x-2 text-gray-700 font-medium hover:text-white hover:bg-blue-600 hover:scale-105 hover:shadow-lg px-4 py-2 rounded-lg transition duration-200 ease-in-out"
                                >
                                    {link.icon}
                                    <span>{link.name}</span>
                                </a>
                            ))}
                        </SignedIn>
                    </div>

                    {/* Desktop Auth Button */}
                    <div className="hidden md:flex items-center space-x-4 mt-4 md:mt-0">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <div className="cursor-pointer text-blue-600 hover:underline">
                                    เข้าสู่ระบบ
                                </div>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton
                                appearance={{
                                    elements: {
                                        userButtonAvatarBox: {
                                            width: "48px",
                                            height: "48px"
                                        }
                                    }
                                }}
                            />
                        </SignedIn>
                    </div>

                    {/* Mobile Menu */}
                    {isOpen && (
                        <div className="w-full md:hidden mt-4 bg-gray-50 rounded-lg shadow-inner p-4 space-y-3">
                            <SignedIn>
                                <div className="space-y-2">
                                    {links.map((link) => (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            className="flex items-center space-x-2 text-gray-700 font-medium hover:text-white hover:bg-blue-600 hover:scale-105 hover:shadow-lg px-4 py-2 rounded-md transition duration-200 ease-in-out"
                                        >
                                            {link.icon}
                                            <span>{link.name}</span>
                                        </a>
                                    ))}
                                </div>
                                <hr className="my-2 border-gray-300" />
                            </SignedIn>

                            <SignedOut>
                                <SignInButton mode="modal">
                                    <button className="w-full flex items-center space-x-2 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-md">
                                        <span>เข้าสู่ระบบ</span>
                                    </button>
                                </SignInButton>
                            </SignedOut>

                            <SignedIn>
                                <div className="flex justify-start px-4">
                                    <UserButton afterSignOutUrl="/" />
                                </div>
                            </SignedIn>
                        </div>
                    )}
                </div>
            </nav>
        </ClerkProvider>
    );
};

export default Navbar;
