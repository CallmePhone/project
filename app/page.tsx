'use client';
import { useState } from "react";
import Navbar from "./Components/Navbar";

import { SignedOut, SignInButton } from "@clerk/nextjs";
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
                    </section>

                    <section className="text-center">
                        <h1 className="text-2xl font-bold">ระบบจัดการอะไหล่รถ</h1>
                        <p className="text-[20px]">ระบบที่จะช่วยให้คุณจัดการกับอะไหล่รถยนต์และมอเตอร์ไซค์ของตุณได้ตลอดเวลา</p>
                    </section>

                    <div className="flex flex-col sm:flex-row items-center gap-10 mt-6">
                        {/* ข้อความด้านซ้าย */}
                        <div className="sm:w-1/2 text-center sm:text-left flex flex-col items-center sm:items-start">
                            <img
                                className="rounded-sm mb-4 shadow-md"
                                src="/img/icon2.ico"
                                alt="icon"
                                width={50}
                                height={50}
                            />
                            <h1 className="text-2xl font-bold">หน้าหลัก</h1>
                            <p className="text-lg mt-2 text-blue-500">ดูรถของท่าน</p>
                            <p className="text-[18px] text-gray-700 mt-2">
                                หน้าหลัก มี Features ดูข้อมูลยานพาหนะของท่านและเพิ่มกัดจัดการซื้ออะไหล่ต่างๆ ได้อย่างสะดวกและบอกเวลาที่เปลี่ยนอะไหล่ได้
                                แค่กดเมนูที่ 1 บน Navbar ของหน้าเวป
                            </p>
                        </div>

                        {/* เส้นคั่นแบบขีด ๆ แนวตั้ง */}
                        <div className="hidden sm:flex justify-center">
                            <div className="h-[200px] border-l border-dashed border-gray-600 mx-6"></div>
                        </div>

                        {/* รูปภาพด้านขวา */}
                        <div className="sm:w-1/2">
                            <img
                                src="/img/2.png"
                                alt="vehicle example"
                                className="w-full h-auto rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-10 mt-6">
                        {/* ข้อความด้านซ้าย */}
                        <div className="sm:w-1/2">
                            <img
                                src="/img/1.png"
                                alt="vehicle example"
                                className="w-full h-auto rounded-lg shadow-lg"
                            />
                        </div>

                        {/* เส้นคั่นแบบขีด ๆ แนวตั้ง */}
                        <div className="hidden sm:flex justify-center">
                            <div className="h-[200px] border-l border-dashed border-gray-600 mx-6"></div>
                        </div>

                        {/* รูปภาพด้านขวา */}
                        <div className="sm:w-1/2 text-center sm:text-left flex flex-col items-center sm:items-start">
                            <img
                                className="rounded-sm mb-4 shadow-md"
                                src="/img/icon2.ico"
                                alt="icon"
                                width={50}
                                height={50}
                            />
                            <h1 className="text-2xl font-bold">ยานพาหนะของฉัน</h1>
                            <p className="text-lg mt-2 text-blue-500">สามารถเพิ่ม-ดูรถของท่าน</p>
                            <p className="text-[18px] text-gray-700 mt-2">
                                ยานพาหนะของฉัน มี Features เพิ่มและดูข้อมูลยานพาหนะของท่านได้อย่างสะดวกและตลอดเวลา
                                แค่กดเมนูที่ 2 บน Navbar ของหน้าเวป
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-10 mt-6">

                        {/* รูปภาพด้านขวา */}
                        <div className="flex flex-col sm:flex-row items-center gap-10 mt-6">
                            {/* ข้อความด้านซ้าย */}
                            <div className="sm:w-1/2 text-center sm:text-left flex flex-col items-center sm:items-start">
                                <img
                                    className="rounded-sm mb-4 shadow-md"
                                    src="/img/icon2.ico"
                                    alt="icon"
                                    width={50}
                                    height={50}
                                />
                                <h1 className="text-2xl font-bold">ประวัติการเปลี่ยน-ซื้ออะไหล่</h1>
                                <p className="text-lg mt-2 text-blue-500">ดูประวัติการเปลี่ยน-ซื้ออะไหล่</p>
                                <p className="text-[18px] text-gray-700 mt-2">
                                    หน้าหลัก มี Features ดูข้อมูลยานพาหนะของท่านและเพิ่มกัดจัดการซื้ออะไหล่ต่างๆ ได้อย่างสะดวกและบอกเวลาที่เปลี่ยนอะไหล่ได้
                                    แค่กดเมนูที่ 1 บน Navbar ของหน้าเวป
                                </p>
                            </div>

                            {/* เส้นคั่นแบบขีด ๆ แนวตั้ง */}
                            <div className="hidden sm:flex justify-center">
                                <div className="h-[200px] border-l border-dashed border-gray-600 mx-6"></div>
                            </div>

                            {/* รูปภาพด้านขวา */}
                            <div className="sm:w-1/2">
                                <img
                                    src="/img/2.png"
                                    alt="vehicle example"
                                    className="w-full h-auto rounded-lg shadow-lg"
                                />
                            </div>
                        </div>
                    </div>


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
