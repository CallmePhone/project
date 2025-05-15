'use client';
import { useState } from "react";
import Navbar from "./Components/Navbar";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Footer from "./Components/Footer";

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ฟังก์ชั่นเปิดปิด modal
    const toggleModal = () => setIsModalOpen(!isModalOpen);

    return (
        <>
            <Navbar />
            <div className="text-black  pt-24 px-6 sm:px-12 bg-gradient-to-b from-white via-gray-50 to-gray-100">
                <main className="max-w-4xl mx-auto flex flex-col gap-10">
                    <section className="text-center sm:text-left">
                        <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">
                            ระบบติดตามและจัดการอะไหล่รถยนต์และมอเตอร์ไซค์ของเรา ✨
                        </h1>
                        <p className="mt-4 text-gray-700 text-base sm:text-lg leading-relaxed">
                            ระบบนี้ถูกออกแบบมาเพื่อช่วยให้คุณสามารถติดตามและจัดการอะไหล่รถยนต์และมอเตอร์ไซค์ของคุณได้อย่างมีประสิทธิภาพ
                            <br />
                            <br />
                            คุณสามารถเพิ่ม ลบ แก้ไข และติดตามประวัติการเปลี่ยนอะไหล่ได้อย่างง่ายดาย
                            <br />
                            <br />
                            นอกจากนี้ยังมีฟีเจอร์อื่น ๆ ที่จะช่วยให้คุณจัดการรถยนต์และมอเตอร์ไซค์ของคุณได้อย่างสะดวกสบาย
                        </p>
                    </section>

                    <section>
                        <ol className="list-decimal list-inside space-y-2 text-gray-800">
                            <li>พัฒนาด้วย Next.js และ Tailwind CSS</li>
                        </ol>
                    </section>

                    <section className="flex flex-col sm:flex-row gap-4 sm:justify-start justify-center">
                        <div className="flex items-center space-x-4">
                            {/* ปุ่มเริ่มต้นใช้งาน = เปิด modal login */}
                            <SignedOut>
                                <SignInButton mode="modal">
                                    <button className="rounded-full bg-blue-600 text-white hover:bg-blue-700 transition px-6 py-3 font-medium shadow-md cursor-pointer">
                                        เริ่มต้นใช้งาน
                                    </button>
                                </SignInButton>
                            </SignedOut>

                            {/* แสดง UserButton เฉพาะตอนที่ SignedIn
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
                            </SignedIn> */}
                        </div>
                        <a
                            className="rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 transition px-6 py-3 font-medium shadow-md"
                            href="#"
                            onClick={toggleModal} // เปิด modal เมื่อคลิก
                        >
                            ดูฟีเจอร์ทั้งหมด
                        </a>
                    </section>
                </main>

                {/* ป็อปอัป */}
                {isModalOpen && (
                    <div className="fixed inset-0  bg-opacity-40 backdrop-blur-md flex justify-center items-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">ฟีเจอร์ระบบ</h2>
                            <ul className="space-y-2 text-gray-700">
                                <li>พัฒนาด้วย Next.js และ Tailwind CSS</li>
                                <li>มีระบบจัดการผู้ใช้และเนื้อหา</li>
                                <li>รองรับการแสดงผลทั้งโหมดมืดและสว่าง</li>
                                <li>รองรับการแจ้งเตือนผ่านอีเมล์</li>
                                <li>รองรับการติดตามการเปลี่ยนแปลงอะไหล่รถยนต์</li>
                                <li>รองรับการเชื่อมต่อกับบริการภายนอกอย่างง่าย</li>
                            </ul>
                            <div className="mt-4 flex justify-end">
                                <button
                                    className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                                    onClick={toggleModal} // ปิด modal เมื่อคลิก
                                >
                                    ปิด
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <Footer />
            </div>
        </>
    );
}
