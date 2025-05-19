import { useUser } from "@clerk/nextjs";
import { Bot } from 'lucide-react';
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
    const { user } = useUser();
    const [showMessage, setShowMessage] = useState(false);
    const [animate, setAnimate] = useState(false);

    const handleBotClick = () => {
        setShowMessage(!showMessage);

        // Trigger animation
        setAnimate(true);
        setTimeout(() => setAnimate(false), 200); // remove class after 200ms
    };

    return (
        <footer className="text-black border-gray-700 mt-auto">
            <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div> <h3 className="text-xl font-semibold mb-4 text-gray-500">Solutions</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-blue-400 transition">Marketing</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Analytics</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Automation</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Commerce</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Insights</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-500">Support</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-blue-400 transition">Submit ticket</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Documentation</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Guides</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-500">Company</h3>
                    <ul className="space-y-2">
                        <li><a href="/about" className="hover:text-blue-400 transition">About</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Blog</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Jobs</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Press</a></li>
                    </ul> </div> <div> <h3 className="text-xl font-semibold mb-4 text-gray-500">Legal</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-blue-400 transition">Terms of service</a></li> <li><a href="#" className="hover:text-blue-400 transition">Privacy policy</a></li> <li><a href="#" className="hover:text-blue-400 transition">License</a></li>
                    </ul>
                </div>
            </div>

            {/* Floating Bot Section */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
                {/* Message Boxes */}
                {showMessage && (
                    <>
                        <div className="bg-white text-sm text-gray-700 p-4 rounded-lg shadow-lg max-w-xs animate-fade-in">
                            <Link href="/information" target="_blank"><p>❌ ไม่สามารถเพิ่มข้อมูลยานพาหนะได้</p></Link>
                        </div>
                        <div className="bg-white text-sm text-gray-700 p-4 rounded-lg shadow-lg max-w-xs animate-fade-in">
                            <p>📌 ฉันสามารถช่วยแนะนำการใช้งานระบบให้คุณได้</p>
                        </div>
                    </>
                )}

                {/* Bot Button */}
                <button
                    onClick={handleBotClick}
                    className={`bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-3 rounded-full shadow-xl
                hover:from-blue-600 hover:to-indigo-600 hover:ring-4 hover:ring-blue-300/30
                transition-all duration-300 ease-in-out transform ${animate ? "scale-110" : ""}`}
                >
                    <Bot className="w-6 h-6 text-white hover:text-black transition-colors duration-300" />
                </button>

            </div>

            {/* Copyright */}
            <div className="mt-6 py-4 text-end text-sm text-gray-400 px-6">
                © 2025 แผนกเทคนิคคอมพิวเตอร์ซอฟต์แวร์
            </div>
        </footer>
    );
}
