'use client';
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";


export default function About() {
    return (
        <>
            <Navbar />
            <div className="text-black min-h-screen flex flex-col pt-24 px-6 sm:px-12 bg-gradient-to-b from-white via-gray-50 to-gray-100">
                <main className="flex-grow max-w-4xl mx-auto flex flex-col gap-10">
                    <section className="text-center sm:text-left">
                        <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4">
                            เกี่ยวกับเรา
                        </h1>
                        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                            ระบบจัดการเว็บไซต์ของเราถูกพัฒนาขึ้นเพื่อช่วยให้ผู้ใช้งานสามารถเข้าถึงข้อมูล
                            และฟีเจอร์ต่าง ๆ ได้อย่างสะดวก ไม่ว่าจะเป็นการดูข้อมูลข่าวสารล่าสุด,
                            การจัดการบัญชีส่วนตัว, หรือการเชื่อมต่อกับบริการอื่น ๆ โดยเราสร้างระบบนี้
                            ด้วย Next.js เพื่อให้โหลดเร็ว ปลอดภัย และง่ายต่อการขยายต่อในอนาคต
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">จุดเด่นของเรา</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>พัฒนาด้วย Next.js และ Tailwind CSS</li>
                            <li>มีระบบจัดการผู้ใช้และเนื้อหา</li>
                            <li>รองรับการแสดงผลทั้งโหมดมืดและสว่าง</li>
                            <li>รองรับการแจ้งเตือนผ่านอีเมล์</li>
                            <li>รองรับการเชื่อมต่อกับบริการภายนอก</li>
                        </ul>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
}
